var latest_index = 0;
var FormElement = [];
var FormName = [];
var CSV_header = [];
var default_form_element = "";

var custom_option = '{"question":[]}';
var custom_option_json = $.parseJSON(custom_option);
var form_element_raw = "";
var default_form_name = "";
var json_index = 0;
var current_page_id = "";
var statistic_attribute = [];
reset_var_question();
var user_count = 0;
var current_iteration = 0;
var current_image_logo_path = "";
hide_statistic_table();
var mobileuser = false;

function get(name) { // https://stackoverflow.com/questions/831030/how-to-get-get-request-parameters-in-javascript
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function pull_current_id() {
    $("#page_id").val(get("id"));
    current_page_id = decodeURIComponent(get("id"));
    current_page_id = atob(current_page_id);
    isLogged();
    user_id = readCookie("user_id");
    isFormOwnerCorrect(current_page_id);
}

function open_option() {


    $("#form_demo_option").modal("show");
}


function csvToArray(str, delimiter) {

    return str.slice(0, str.indexOf("\n")).split(delimiter);

}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}


/*

 for(var element of custom_option_json.question){
        if(element.type == "binary"){
            
        }
    }
    */
var csv_data = "";

function reset_custom_option(){
    // if custom length abnormal remove all custom option data
    if(FormElement.length - custom_option_json.question.length>FormElement.length){
         custom_option_json = JSON.parse(custom_option);
    }
}



function showresult() {

    $("#thead_result").empty();
    $("#tbody_result").empty();
    hide_statistic_table();
    
    $("#attendant_iter_val").html(current_iteration);
    $("#attendant_iter_val_date").html(file_iteration_date[current_iteration]);

    $.ajax({


        url: "user_form_control.php",
        data: {

            page_id: current_page_id,
            option: "pull_csv",
            iteration: current_iteration
        },
        cache: false,
        async: false,
        type: "POST",

        success: function (response) {
           
            csv_data = response;
            var csv_data_arr = csv_data.split("\r\n");

            for (var x = 1; x < csv_data_arr.length; x++) {
                if (x == 1) {
                    var html = '';
                    var data_row = csv_data_arr[x].split(",");
                    for (var y = 0; y < data_row.length; y++) {
                        // if table title same with question table title then push if type of question type is binary then x,y
                        var table_title = data_row[y];


                        html += '<th scope="col">' + data_row[y] + '</th>';
                    }

                    $("#thead_result").append(html);

                } else {
                    // 
                    if (csv_data_arr[x] != "") {
                        var html = '<tr>';


                        var data_row = csv_data_arr[x].split('\",\"');
                        for (var y = 0; y < data_row.length; y++) {
                            //.replace(, '')

                            var single_column = data_row[y].replace("<", "<‎"); // contain invisible char

                            if (single_column[0] == '"') {
                                single_column = setCharAt(single_column, 0, '');
                            }

                            if (single_column.lastIndexOf('"') == single_column.length - 1) {

                                single_column = setCharAt(single_column, single_column.lastIndexOf('"'), '');

                            }

                            html += '<td scope="col" >' + single_column + '</td>';
                        }
                        html += '</tr>'
                        $("#tbody_result").append(html);
                    }

                }

            }

        },
        error: function (xhr) {

        }
    });

    //$("#thead_result").empty();
    // generate_statistic();
   // get_current_pg_iteration();
   //alert("s");
   grade_generate();
    $("#table_output").modal("show");
    
}

function appendFormOption(option_name, keyvalue) {
    var delete_button = '<div class="col-sm-1">' +
     '<a type="button" class=" btn-danger btn-lg " onclick="deleteOption(\'' + latest_index + '\',\'-1\')">' +
    '<img class="img-responsive center-block" width="25" height="25" src="image/bin.png">' + '</div>' +
    '</a>';
    var no_delete_val = false;
    if(keyvalue=="name"){
        no_delete_val = true;
    }
    if(keyvalue == "matrix_num"){
        no_delete_val = true;
    }
    
    if(no_delete_val){
        delete_button = "";
    }
    var htmlData = '<div id="' + latest_index + '" class="border-primary pt-sm-1">' +
        '<div class="border-secondary p-sm-2 rounded border border-outline-primary">' +
        '<div class="row">' +
        
        delete_button+
       
        '<div class="col-11">' +
        '<h5 class="pt-2">' + '<span class="text-primary " >' + option_name + '</span>' + '</h5>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '</div>';

    $("#form_field").append(htmlData);
    FormElement.push(keyvalue);
    FormName.push(option_name);
    CSV_header.push(keyvalue);
    console.log(FormName + latest_index);
    latest_index++;
    var max_length_data = FormElement.length;
    $("#total_opt").text(max_length_data);

}
var record_count = 0; // weird math bug. i cannot solve with ethical way. so use some cheat method :D
function deleteOption(option_index, js_index_delete) {
    record_count++;
    if (record_count < 2) {
        console.log(record_count + "curr index" + option_index);
        //alert("check");
        $("#form_field #" + option_index).remove();
        latest_index--;
        FormElement.splice(parseInt(option_index), 1);
        FormName.splice(parseInt(option_index), 1);
        // $('#tag').attr("id","newId")
        var max_length_data = FormElement.length;
        $("#total_opt").text(max_length_data);
        //console.log("maxdata:"+max_length_data);
        var non_index_option = parseInt(option_index);
        non_index_option++;
        // console.log("nonindex: "+non_index_option);
        if (max_length_data >= (non_index_option)) { // if max length bigger. change index number after current replacement
            for (var x = parseInt(option_index); x < max_length_data; x++) {
                // current removed is 5. next is 6. rename 6 into 5
                var next = x;
                next += 1;
                var old = x;
                $('#form_field #' + next).attr('onclick', 'deleteOption("' + old + '")');
                $('#form_field #' + next).attr("id", old);
                console.log("old : " + next + " new: " + old);


            }
        }
    } else {
        record_count = 0;
    }


    console.log(FormElement);

    if (js_index_delete > -1) {
        for (var i = 0; i < custom_option_json.question.length; i++) {
            //alert(custom_option_json.question[i].jsonindex);
            if (custom_option_json.question[i].jsonindex == js_index_delete) {
                custom_option_json.question.splice(i, 1);
                //alert("found");
                break;
            }
        }
    }
    console.table(custom_option_json.question);

}

var customoption_to_be_send = {"question":[]};
function saveData() {
    // alert(FormName);
    updateCustomForm();
   console.log("Element Writer");
    customoption_to_be_send = JSON.parse(JSON.stringify(custom_option_json));
    resetCustomOptionIndex();
    console.log( elementWriter(elementNameToJSON(FormName)));
    setTimeout(function () {
        $.ajax({


            url: "user_form_control.php",
            data: {
                page_title: $("#page_title").val(),
                page_date: $("#page_date").val(),
                default_form_element: elementWriter(FormElement),
                default_form_name: elementWriter(elementNameToJSON(FormName)),
                csv_overhead: elementWriter(CSV_header),
                form_element: saveUserInfoJSON(),
                page_id: current_page_id,
                option: "update"
            },
            cache: false,
            type: "POST",

            success: function (response) {
                latest_index =0;


            },
            error: function (xhr) {

            }
        })
    }, 500);



    // alert("Sign in done !");

    close_prompt();
}

function cleandata() {
    var checkreset = confirm("Do you want to reset all form data ?");
    if(checkreset==true){
         $.ajax({


            url: "user_form_control.php",
            data: {
                page_id: current_page_id,
                option: "cleandata"
            },
            cache: false,
            type: "POST",
    
            success: function (response) {},
            error: function (xhr) {
    
            }
        });
        alert("Current Form Iteration data has been resetted !");
        read_form_provider_info();
    }else{
        
    }
   
    
   
}

function deletepg() {
        var checkdelete = confirm("Do you want to delete this form page ?");
    if(checkdelete==true){
        $.ajax({


        url: "user_form_control.php",
        data: {
            page_id: current_page_id,
            option: "deletepg"
        },
        cache: false,
        type: "POST",

        success: function (response) {},
        error: function (xhr) {

        }
    });
    alert("Page Deleted");
    location.href = "page_maker.html";
    }else{
        
    }
    
}
function resetCustomOptionIndex(){ // when saving data. reset the custom index in order to avoid position glitch
    var json_current_index = 0;
    for(var element of customoption_to_be_send.question){
        element.jsonindex = json_current_index;
        json_current_index++;
    }
    console.table(customoption_to_be_send.question);
}
function saveUserInfoJSON() {
   // alert(JSON.stringify(custom_option_json));
   if(custom_option_json.length<1){
       return "";
   }else{
    return JSON.stringify(customoption_to_be_send);
   }
   
}

function elementNameToJSON(element_list) {
   
    var newElement = [];
    var json_curr_index = 0;
    for (var x = 0; x < element_list.length; x++) {
        if (FormElement[x].toLowerCase() == "custom") {
           // console.log("ee"+customoption_to_be_send.question[json_curr_index].table_title);
           try{
            if(customoption_to_be_send.question[json_curr_index].table_title==undefined){
                json_curr_index++;
            }else{
                newElement.push(customoption_to_be_send.question[json_curr_index].table_title);
                json_curr_index++;
            }
            
           }catch(e){
            json_curr_index++;
           }
          
        } else {
            newElement.push(element_list[x]);
        }

    }
    
   

    return newElement;
}

function confirmSaveData() {
    $("#confirm_save_dialog").modal("show");



}

function close_prompt() {
    $("#confirm_save_dialog").modal("hide");
  //  var encodedid = btoa(current_page_id);
   // setTimeout(function(){location.href = "form_manager.html?id=" + (encodeURIComponent(encodedid))},200); ;

}

function elementWriter(element) {
    var read_first_element = false;
    var combined_element = "";
    for (var x = 0; x < element.length; x++) {
        if (!read_first_element) {
            combined_element += element[x];
            read_first_element = true;
        } else {
            combined_element += "," + element[x];
        }
    }

    return combined_element;
}


function read_form_provider_info() {
    //console.log("reaid");
    FormElement = [];
    FormName = [];
    CSV_header = [];
    form_element_raw = "";
    default_form_name = "";
   $("#form_field").empty();
    screenWidthChange();
    if (!current_page_id == "") {

        $.ajax({

            url: "user_form_control.php",
            data: {
                "option": "read",
                "page_id": current_page_id

            },
            cache: false,
            type: "POST",
            success: function (response) {
              //alert(response);
                var json = $.parseJSON(response);
                $("#page_title").val(json[0].page_title);
                $("#page_date").val(json[0].page_date);
                current_iteration = json[0].iteration;
                $("#iteration_value").html(current_iteration);
                document.title = "Form Manager - " + (json[0].page_title);

                default_form_element = "";
                default_form_name = "";
                default_form_element = json[0].default_form_element;
                default_form_name = json[0].default_form_name;
                form_element_raw = json[0].form_element;
                current_image_logo_path = json[0].form_logo;
                //setTimeout(function(){titleMarquee()}) ;

                load_image_logo();
                reload_form_maker_data();


            },
            error: function (xhr) {

            }
        });


    }

}


function reload_form_maker_data() {
    FormElement = [];
    FormName = [];
    custom_option = '{"question":[]}';
    custom_option_json = $.parseJSON(custom_option);

    var default_form_element_data = default_form_element.split(",");
    var default_form_name_data = default_form_name.split(",");
    try {
        //alert(form_element_raw);
        custom_option_json = $.parseJSON(form_element_raw);

    } catch (err) {}

    var json_curr_index = 0;

    if (default_form_element_data != "") {

        for (var x = 0; x < default_form_element_data.length; x++) {

            if (default_form_element_data[x] == "custom") {
                // get customoption type. then render html based on type
                //alert(JSON.stringify(custom_option_json.question[json_curr_index]));
                renderCustomOption(custom_option_json.question[json_curr_index], true);

                json_curr_index++;
            }
            // any element equal to default form element requested by provider will be turn on as requested data
            else {
                appendFormOption(default_form_name_data[x], default_form_element_data[x]);

            }

        }
    }




}


function renderCustomOption(json_data, reloaded) {
    if (json_data.type == "binary") {
        appendCustomFormOption_Binary(json_data.table_title, json_data.title, json_data.firstval, json_data.secondval,json_data.thirdval, reloaded);
    }
    if (json_data.type == "likert") {
        appendCustomFormOption_Likert(json_data.table_title, json_data.title, json_data.firstval, json_data.secondval,json_data.thirdval,json_data.fourthval,json_data.fifthval ,reloaded);
    }
    if (json_data.type == "text") {
        appendCustomFormOption_Text(json_data.table_title, json_data.title, reloaded);
    }

}

function reset_var_question() {
    for (var y = 0; y < Object.keys(custom_option_json.question).length; y++) { // reset all answer to avoid garbage data after modification
        custom_option_json.question.pop();
    }
}



function generated_base64id(type) {

    var encodedid = btoa(current_page_id);
    if(type=="user"){  window.open("user_form.html?id=" + (encodeURIComponent(encodedid)));}
    if(type=="self-sign"){  window.open("manual_signer.html?id=" + (encodeURIComponent(encodedid)));}
  
}


function chartgenerate(title, xValues, yValues, canvasid, type_chart) {
    //alert("called"+canvasid);
    //yValues = yValues.sort(); // data

    var original_data_label = xValues.slice();
    var modified_data_label = xValues.slice().sort();
    var original_data = yValues;
    var modified_data = [];
    console.log("orig:" + original_data_label);
    console.log("mod:" + modified_data_label);

    for (var y = 0; y < modified_data_label.length; y++) { // loop label
        for (var x = 0; x < original_data_label.length; x++) {
            if (modified_data_label[y] == original_data_label[x]) { // if label sort same with label original
                console.log("currindex origdata:" + x + "currindex newx:" + y);
                modified_data.push(original_data[x]);
            }
        }
    }


    console.log("old:" + original_data + "new:" + modified_data);

    var html =
        '<div class="col-6 m-auto pb-4 py-4 chart-container" style="position: relative; height:30vh; width:30vw" >' +
        '<canvas id="statistic_draw-' + canvasid + '" > </canvas>' +

        '</div>';
    var bgcolor = ["#a569bd", "#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F", "#a2d9ce", "#0e6655", "#154360", "#512e5f", "#d68910", "#a569bd", "#cb4335", "#a2d9ce", "#0e6655", "#154360", "#512e5f", "#d68910"];
    var bdcolor = ["#212f3d", "#900C3F", "#DAF7A6", "#FFC300", "#FF5733", "#C70039"];
    $.when($("#statistic_canvas").append(html)).then(
        setTimeout(function () {
            new Chart("statistic_draw-" + canvasid, {
                type: type_chart,
                maintainAspectRatio: false,
                responsive: true,
                data: {
                    labels: modified_data_label,
                    datasets: [{
                        label: title,
                        backgroundColor: bgcolor,
                        borderColor: bdcolor,
                        data: modified_data
                    }]
                },

                options: {
                    title: {
                        display: true,
                        text: title,
                        fontSize: 15
                    },

                    plugins: {
                        datalabels: {
                            formatter: (value, ctx) => {
                                let datasets = ctx.chart.data.datasets;
                                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                                    let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                                    let percentage = Math.round((value / sum) * 100) + '%';
                                    return percentage;
                                } else {
                                    return percentage;
                                }
                            },
                            color: '#212f3d',
                            fontSize: 7
                        }

                    },
                }
            });

        }, 500)
    );
    //alert("ss");

}
function statistic_info(user_length) {
    var html = '<div class="row justify-content-start">' +
        '<div class="col-auto">' +
        '<p class="text-dark">Data is gathered from <b><span class="text-primary">' + user_length + '</span></b> people</p>' +
        '</div>' +
        '</div>';
    $("#statistic_canvas").append(html);
}
function empty_data() {
    var html = '<div class="row justify-content-start">' +
        '<div class="col-auto">' +
      
        '<p class="text-dark">No respondent data has been recorded yet 😔</p>' +
        '</div>' +
        '</div>';
    $("#statistic_canvas").append(html);
}

function openchart(type_chart) {
    $("#statistic_canvas").empty();
    var json_table = parseCSV(csv_data.replace(/[\r]/g, ''));
    var table_length = json_table.length;
    var column_length = json_table[0].length;
    var attribute_accepted_column = [];
    var csv_header_curr_table = json_table[0];
    var nodata = false;
    if(table_length-2==0){
        nodata = true;
    }

    //alert(table_length-2);


    // check if table column can be calculate
    for (var y = 0; y < column_length; y++) {
        console.log(csv_header_curr_table);
        if (accept_element_for_statistic(y, csv_header_curr_table) == true) {
            attribute_accepted_column.push(y);
        }
    }
    if(!nodata){
       // alert("here");
        statistic_info(table_length-2);
    
        // console.log(attribute_accepted_column);
    //alert(FormName);
    for (var y = 0; y < attribute_accepted_column.length; y++) {
        //console.log("Column name : "+FormName[attribute_accepted_column[y]]);
        // scan through all each column . then pull all row[attributecol[value]] data. to array set data_per_column. 
        //console.log("attrcol"+y);
        var per_column_data = pull_data_for_column(attribute_accepted_column[y], table_length, json_table);

        // after that. build array counter to pull start counting data.
        var clean_data_set = [];
        var attr_counter = []

        for (var z = 0; z < per_column_data.length; z++) {
            // create clean data set. no redundance data
            if (!clean_data_set.includes(per_column_data[z])) {
                clean_data_set.push(per_column_data[z]);
            }
        }
        for (var z = 0; z < clean_data_set.length; z++) {
            // build clean data_set counter length
            attr_counter.push(0);
        }
        // alert(attr_counter);
        for (var z = 0; z < clean_data_set.length; z++) {
            // alert("here");
            for (var x = 0; x < per_column_data.length; x++) {
                if (per_column_data[x] == clean_data_set[z]) {
                    attr_counter[z] += 1;
                }
            }
        }
        var attr_title = json_table[1][attribute_accepted_column[y]];
        //  console.log("Data report : \nData filename : "+attr_title+"\nData Grouping: "+clean_data_set+"\nData count : "+attr_counter);

        chartgenerate(attr_title, clean_data_set, attr_counter, y, type_chart);


    }


    $.when(function () {
        $("#statistic_canvas").show();


    }).then(function () {

        $("#data_table").get(0).scrollIntoView();
        $("#view_point_canvas").get(0).scrollIntoView();
    });

    // console.log(json_table);
    }else{
        empty_data();
    }

}

function hide_statistic_table() {
    $("#statistic_canvas").empty();
}

function pull_data_for_column(column_value, table_length, json_table) {
    // scanning method : 
    // pull all column data.

    //  console.log("colval"+column_value);
    var pulled_dataset = [];
    for (var x = 2; x < table_length; x++) {


        pulled_dataset.push(json_table[x][column_value]);

    }
    //   console.log("pulldataset : "+pulled_dataset);
    return pulled_dataset;
}

function accept_element_for_statistic(elem_position, csv_header_curr_table) {

    var countable_attribute = ["city", "state", "religion", "race", "department", "course", "class", "club", "likert", "binary"];
    var form_element_name = csv_header_curr_table[elem_position];
//    console.log("curr_table : " + form_element_name);

    //console.log("here"+form_element_name);
    var accept_data = true;
   // console.log("formelementcsvhead : " + form_element_name);
    if (countable_attribute.includes(form_element_name)) {
        // if table is non countable for statistic attribute, then skip
        // countable : city,state,religion,race,department,course,class,club

        return true;

    } else {
        return false;
    }
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var current_picture_path = $("#current_picture").attr("src");
        var reader = new FileReader();
        var image_blob = "";
        var new_image_name = Math.floor(Math.random() * (999999 - 10000 + 1) + 10000).toString()+".jpg";
        var full_filename  = "public/form_logo/"+current_page_id+"-"+new_image_name;
        reader.onload = function (e) {
           
            image_blob =  e.target.result;
         
                $.ajax({
                

                    url: "user_form_control.php",
                    data: {
                        new_picture:full_filename,
                        old_picture:current_picture_path,
                        image_data:image_blob,
                        page_id: current_page_id,
                        option: "upload_logo"
                    },
                    cache: false,
                    type: "POST",
        
                    success: function (response) {
                   // alert(response);
                   setTimeout(function(){current_image_logo_path = full_filename;load_image_logo();},300);
        
        
                    },
                    error: function (xhr) {
        
                    }
                });
         
           
        }

        reader.readAsDataURL(input.files[0]);
       
        
       

    }
    
}


function load_image_logo(){
    $("#current_picture").attr("src",current_image_logo_path);
    $("#logo_image_modal").attr("src",current_image_logo_path);
}
function resizeBase64Img(base64) {
  
    return new Promise((resolve, reject)=>{
        var canvas = document.createElement("canvas");
        canvas.width = "100px";
        canvas.height = "100px";
        let context = canvas.getContext("2d");
        let img = document.createElement("img");
        img.src = base64;
        img.onload = function () {
           // context.scale(newWidth/img.width,  newHeight/img.height);
           var ratio = img.naturalWidth / img.naturalHeight;
            var width = canvas.width;
            var height = width / ratio;
            ctx.drawImage(image, 0, 0, width, height);
            resolve(context.toDataURL());               
        }
    });
}

function screenWidthChange(){
    var windowsize = $(window).width();
   // alert(windowsize);

    $(window).resize(function() {
        windowsize = $(window).width();
        if (windowsize > 440) {
        
        }else{
            if(mobileuser==false){
                alert("Warning : Editing in mobile phone will be not pleasant to be use and there issue with graph component where it unable to display data properly in mobile phone.<br>Please switch to desktop to edit without hassle");
                mobileuser = true;
            }
          
        }
    });
    setTimeout(function(){screenWidthChange()},500);
}