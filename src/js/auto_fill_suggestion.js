
var dataobj = "";

$.ajax({

        
    url: "attribute_selection.json",
    cache: false,
    type: "POST",
    
    success: function(response) {
     setdata(response);
        
      
    }
    ,
        error: function(xhr) {
    
        }
    });

function setdata(data){
    dataobj = data;
  
}

function open_suggestion(id){
    $("#suggestion_modal").modal("show");
    var cap_id = id.charAt(0).toUpperCase() + id.slice(1);
    generate_attr_list(cap_id);
}
//  city,state,zipcode,course,department,race,religion,class,club,job,

// ,state:{},zipcode:{},course:{},department:{},race:{},religion:{},class:{},club:{},job:{}}

function generate_attr_list(id){
    var html ="";
    
    var dataList_ = [];
    if(id.toLowerCase()=="city"){
        for(var x of dataobj.city){
            dataList_.push(x);
            
        }
    }
    if(id.toLowerCase()=="state"){
        for(var x of dataobj.state){
            dataList_.push(x);
            
        }
    }
    if(id.toLowerCase()=="race"){

        for(var x of dataobj.race){
           
            dataList_.push(x);
            
        }
    }
    if(id.toLowerCase()=="course"){
        for(var x of dataobj.course){
            dataList_.push(x);
            
        }
    }
    if(id.toLowerCase()=="department"){
        for(var x of dataobj.department){
            dataList_.push(x);
            
        }
    }
    if(id.toLowerCase()=="religion"){
        for(var x of dataobj.religion){
            dataList_.push(x);
            
        }
    }
 
    if(id.toLowerCase()=="club"){
        for(var x of dataobj.club){
            dataList_.push(x);
            
        }
    }
  

    for(var x = 0;x<dataList_.length;x++){
        html += '<li onclick="select_item_attr(\''+dataList_[x]+'\',\''+id+'\')" class="list-group-item list-group-item-action list-group-item-info sidebar bg-green">'+dataList_[x]+'</li>';

    }
    $("#item_list").empty();
    $("#item_list").append(html);
    

    $("#attribute_title").html(id)


   
}

function select_item_attr(value,id){

   $("#"+id.toLowerCase()).val(value);
   $("#suggestion_modal").modal("hide");
   
   
}

function forceInputUppercase(e)
{
  var start = e.target.selectionStart;
  var end = e.target.selectionEnd;
  e.target.value = e.target.value.toUpperCase();
  e.target.setSelectionRange(start, end);
}




function check_identity_availability(type){
    $("#accept_btn").attr("disabled",false);
    var input_type = "";
    var attribute = "";
    if(type=="matrix_num"){
        input_type = "Matrix Number";
        attribute = "matrix_num";
    }
    if(type=="ic_num"){
        input_type = "Identity Card Number";
        attribute = "ic_number";
    }
    if(type=="phone_num"){
        input_type = "Phone Number";
        attribute = "phone_num";
    }
   var val_target = $("#"+type).val();
   $("#"+type).val( val_target.toUpperCase());
    $.ajax({


        url: "user_control.php",
        data: {
            user_id:user_id,
            input_target:type,
            attribute:attribute,
            data:val_target,
            option: "get_identity"
        },
        cache: false,
        type: "POST",
        async:false,

        success: function (response) {
       //  alert(response);
            var json = $.parseJSON(response);
            var username = "";
            var user_id = "";
           
            if(json.length>0){
                var pulled_data = "";
                var match_value = "";
                if(type=="matrix_num"){
                    pulled_data = json[0].matrix_num;
                    match_value = current_matrix_num;
                }
                if(type=="ic_num"){
                    pulled_data = json[0].ic_number;
                    match_value = current_ic_num;
                }
                if(type=="phone_num"){
                  //  alert()
                    pulled_data = json[0].phone_num;
                    match_value = current_phone_num;
                }
               //  alert('"'+pulled_data+'"'+" = orig"+ '"'+match_value+'"');
                if(pulled_data!=match_value){
                   // alert(pulled_data+" = "+ match_value);
                    $("#existed_attr_text").html(input_type+" already Exist");
                    $("#existed_attr_dialog").modal("show");
                    $("#accept_btn").attr("disabled",true);
                  
                }else{
                    $("#accept_btn").attr("disabled",false);
                }
            
               
                
            }
        },
        error: function (xhr) {  }
    });
}