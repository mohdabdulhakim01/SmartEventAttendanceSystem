// get all file name using iteration js
// pull column matrix and name
// dynamic array = ,matrix array,counter array
// if matrix not exist then put in dynamic and matrix and add counter array.
// if matrix exist then loop matrix array. found matrix val in matrix array ? then iterate counter array.
// next file :
var all_iteration_filename = [];
var csv_grade_data = "";
var matrix_number_grade = [];
var username_grade = [];
var attendant_grade = [];
function grade_generate(){
    
    $("#attend_status_canvas").empty();
    matrix_number_grade = [];
    username_grade = [];
    attendant_grade = [];
    all_iteration_filename = [];

    iteration_pull(); // pull filename
    console.log(all_iteration_filename);
    var iteration_count = all_iteration_filename.length;
  
    for(var y = 0;y<iteration_count;y++){
        var non_index = y;non_index++;
        pull_csv_for_grade(non_index); // pull current table
        
        var json_table = parseCSV(csv_grade_data.replace(/[\r]/g, ''));
        var table_length = json_table.length;
        var data_header = json_table[0];
        var column_data = [];
        var valid_pull = 0;
        var matrix_col = 0;
        var name_col = 0;
      // console.log(data_header);
       for(var a = 0;a<data_header.length;a++){ // check if column has name and matrix then start pulling column
        if(data_header[a] == "name"){ 
            valid_pull +=1;
            name_col = a;
        }
        if(data_header[a] == "matrix_num"){ 
            valid_pull +=1;
            matrix_col = a;
         }
        }
        //console.log("pass this");
        
        
        if(valid_pull>=2){
            console.log("passed");
            //alert("sisis"+matrix_col+" ; "+table_length);
            var column_data_matrix =  pull_data_for_column_grade(matrix_col,table_length,json_table); // fresh column matrix
            
            var column_data_name =  pull_data_for_column_grade(name_col,table_length,json_table); // fresh column name
            console.log(column_data_name);
            dynamic_value_manager(column_data_matrix,column_data_name);



        }
    
    }
    console.log(username_grade);
    console.log(attendant_grade);
   // alert(username_grade);
    insert_attendant_status_html(iteration_count);
    
}


function dynamic_value_manager(matrix_array_list,name_array_list){
    var matrix_number_index = 0;
    var maxmove = 1;
    var repeated = [];
    // if matrix array not exist in repeated then push in repeated. 
    // if matrix array exist then skip reading.

    for(var k = 0;k<matrix_array_list.length;k++){
        if(matrix_array_list[k]!=""){
            if(!repeated.includes(matrix_array_list[k])){
                if(!matrix_number_grade.includes(matrix_array_list[k])){ // if not exist then add.
                    matrix_number_grade.push(matrix_array_list[k]);
                    username_grade.push(name_array_list[k]);
                    attendant_grade.push(1);
                }else{ // found then add counter
                    console.log("maxmove : "+(maxmove++));
                    matrix_number_index = find_item_index(matrix_number_grade,matrix_array_list[k]);
                    attendant_grade[matrix_number_index] +=1; 
                }
                repeated.push(matrix_array_list[k]);
                console.log("counter : "+attendant_grade[matrix_number_index]);
            }else{
                // skip reading
            }
        }
       
           
    }
}


function find_item_index(item_array,value){
    for(var x = 0;x<item_array.length;x++){
        if(item_array[x]==value){
            return x;
        }
    }
}




function pull_data_for_column_grade(column_value, table_length, json_table) {
    // scanning method : 
    // pull all column data.
 

    
    var pulled_dataset = [];
    for (var x = 2; x < table_length; x++) {

        pulled_dataset.push(json_table[x][column_value]);

    }
      console.log("pulldataset : "+pulled_dataset);
    return pulled_dataset;
}


function pull_csv_for_grade(iter_target_number){
    $.ajax({
         url: "user_form_control.php",
        data: {

            page_id: current_page_id,
            option: "pull_csv",
            iteration: iter_target_number
        },
        cache: false,
        async: false,
        type: "POST",

        success: function (response) {
            csv_grade_data = response;
        },
        error: function (xhr) {}
    });
}


function iteration_pull(){
    var iteration_filename;
    $.ajax({
        url: "user_form_control.php",
        data: {
            page_id: current_page_id,
            option: "get_file_iteration"
        },
        cache: false,
        async: false,
        type: "POST",

        success: function (response) {
            iteration_filename = response.split(",");
        },
        error: function (xhr) {}
    });
    var iter_length = iteration_filename.length;
  
    file_iteration_date = [0];
    for (var x =0;x<iter_length; x++) {
        //alert(iteration_filename[x]);
        var current_filename = iteration_filename[x].split("|")[0];
        all_iteration_filename.push(current_filename);

    }   
}
function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}
function insert_attendant_status_html(max_iteration){
    /*

    matrix_number_grade = [];
    username_grade = [];
    attendant_grade = [];

    */

    var usergrade = [];
    //var usergrade_obj = JSON.parse(usergrade);
    for(var x = 0;x<matrix_number_grade.length;x++){
        usergrade.push({"matrix_number":matrix_number_grade[x],"username":username_grade[x],"attendant_count":attendant_grade[x]});
    }
    usergrade.sort(function(a, b) {  return a.attendant_count- b.attendant_count;});
    usergrade.reverse();
    var bar_color_1 = "bar_color10 border border-2 border-dark";
    var bar_color_2 = "bar_color20 border border-2 border-dark";
    var bar_color_3 = "bar_color30 border border-2 border-dark";
    var bar_color_4 = "bar_color40 border border-2 border-dark";
    var bar_color_5 = "topuser_bar  border border-2 border-dark ";

    var img_icon_1 = "image/stone.png";
    var img_icon_2 = "image/turtle.png";
    var img_icon_3 = "image/rabbit.png";
    var img_icon_4 = "image/horse.png";
    var img_icon_5 = "image/flame.png";
    /*

        
    stone - 10,20
    turtle - 30,40
    rabbit - 50,60,70
    horse - 80,90

    */
   console.log(usergrade);
   var total_attendant = usergrade.length;
   var count_response = 0;
   var total_attendance_rate = 0;
   var max_total_attendance_expect = max_iteration*total_attendant;

    for(var y = 0;y<usergrade.length;y++){
        
        var iter_attend = usergrade[y]["attendant_count"];
        var matrix_number = usergrade[y]["matrix_number"];
        var username = usergrade[y]["username"];
        count_response +=iter_attend;

        var user_attend_percentage = Math.round((iter_attend/max_iteration)*100);
        //alert("iter:"+iter_attend+" percent : "+user_attend_percentage+" username :"+username);
        if(inRange(user_attend_percentage,1,29)){
            attend_status_painter(username,matrix_number,iter_attend,user_attend_percentage,bar_color_1,img_icon_1);
        }
        if(inRange(user_attend_percentage,30,49)){
            attend_status_painter(username,matrix_number,iter_attend,user_attend_percentage,bar_color_2,img_icon_2);
        }
        if(inRange(user_attend_percentage,50,79)){
            attend_status_painter(username,matrix_number,iter_attend,user_attend_percentage,bar_color_3,img_icon_3);
        }
        if(inRange(user_attend_percentage,80,89)){
            attend_status_painter(username,matrix_number,iter_attend,user_attend_percentage,bar_color_4,img_icon_4);
        }
        if(user_attend_percentage>=90){
            attend_status_painter(username,matrix_number,iter_attend,user_attend_percentage,bar_color_5,img_icon_5);
        }
    }
    var attendance_rate_color = "";
    var low_color = "text-danger";
    var bit_high_color = "text-warning";
    var medium_color = "text-info";
    var almost_high_color = "text-primary";
    var high_color = "text-success";
    total_attendance_rate  = Math.round((count_response/max_total_attendance_expect)*100);
    if(inRange(total_attendance_rate,1,29)){
        attendance_rate_color = low_color;
    }
    if(inRange(total_attendance_rate,30,49)){
        attendance_rate_color = bit_high_color;
    }
    
    if(inRange(total_attendance_rate,50,79)){
        attendance_rate_color = medium_color;
    
    }
    if(inRange(total_attendance_rate,80,89)){
        attendance_rate_color = almost_high_color;
    }
    if(total_attendance_rate>=90){
        attendance_rate_color = high_color;
    }

    $("#total_attendance_rate_value").html("<span class='"+attendance_rate_color+"'>"+total_attendance_rate+"%</span>");
    $("#total_attendant_value").html(total_attendant);
    $("#total_attendant_response_value").html(count_response);
    $("#total_iteration_value").html(max_iteration);

}




function attend_status_painter(username,matrix_number,attendant_count,percentage,bar_color,image_icon){
   
    var html =  '<div class="progress position-relative my-1">'+
      '<div class="progress-bar  '+bar_color+'  rounded-2 rounded " role="progressbar" style="width: '+percentage+'%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>'+
      '<h5 class="container justify-content-between d-flex position-absolute w-100 text-white ">'+
      '<div class="justify-content-between w-100 text-white pt-2 py-1 row">'+
                    '<div class="col-auto">'+
                      '<h6 class="px-2 text_stroke">'+username+' • '+matrix_number+'</h6>'+
                    '</div>'+
                    '<div class="col-auto">'+
                      '<div class="row justify-content-end">'+
                        '<div class="col-4 ">'+
                          '<img src="'+image_icon+'" class="img-fluid" width="20" height="20">'+
                        '</div>'+
                        '<div class="col-4">'+
                        '<h6><div class="badge bg-primary p-2 text-white">'+attendant_count+'</div></h6>'+
                      '</div>'+
                        '<div class="col-4 text-dark">'+
                          '<h5 class="text-bold">'+percentage+'%</h5>'+
                        '</div>'+
                       
                        
                        
                      '</div>'+
                     
                      
                    '</div>'+
                  '</div>'+
                  '</div>'+
      '</div>';
  //alert(username);
    $("#attend_status_canvas").append(html);

}