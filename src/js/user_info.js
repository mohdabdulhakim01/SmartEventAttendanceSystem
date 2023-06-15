var user_id = "";
var current_phone_num = "";
var current_matrix_num = "";
var current_ic_num = "";
var info_obj = {};
function user_info_com(option){
    isLogged();
    user_id = readCookie("user_id");
    if(option=="getusername"){
        $.ajax({
        
            url: "user_control.php",
            data: { 
                "option":"read",
                "user_id":user_id
               
            },
            cache: false,
            type: "POST",
            success: function(response) {
                var json = $.parseJSON(response);
                var username = json[0].name;
                if(username==""){
                    username = "USER"+user_id;
                }
                $("#welcomeuser").html("Welcome Back "+username);
                $("#welcomeuser1").html("Welcome Back "+username);
                //alert(username);
            }
            ,error:function(response){}
        });
    }
    if(option=="read_info"){
        $.ajax({
        
            url: "user_control.php",
            data: { 
                "option":"read",
                "user_id":user_id
               
            },
            cache: false,
            type: "POST",
            success: function(response) {
              //alert(response);
                var json = $.parseJSON(response);
                $("#student_name").val(json[0].name);
                $("#ic_num").val(json[0].ic_number);
                $("#birthday").val(json[0].birthday);
                $("#matrix_num").val(json[0].matrix_num);
                $("#email").val(json[0].email);
                $("#phone_num").val(json[0].phone_num);
                $("#home_address").val(json[0].address);
                $("#primary_school").val(json[0].primary_school);
                $("#lower_secondary").val(json[0].lower_secondary);
                $("#upper_secondary").val(json[0].upper_secondary);
                $("#university").val(json[0].university);
                $("#college").val(json[0].college);
                $("#polytechnic").val(json[0].polytechnic);
                $("#current_job").val(json[0].current_job);
                $("#father_name").val(json[0].father_name);
                $("#mother_name").val(json[0].mother_name);
                $("#emergency_num").val(json[0].emergency_number);
                $("#city").val(json[0].city);
                $("#state").val(json[0].state);
                $("#zip_code").val(json[0].zip_code);
                $("#religion").val(json[0].religion);
                $("#race").val(json[0].race);
                $("#department").val(json[0].department);
                $("#course").val(json[0].course);
                $("#club").val(json[0].club);
                $("#class").val(json[0].class);
                current_phone_num = json[0].phone_num;
                current_matrix_num = json[0].matrix_num;
                current_ic_num = json[0].ic_number;

            },
            error: function(xhr) {
        
            }
        });
      
    }
    if(option=="update_info"){
        
        if(!checkEmpty()){
            $.ajax({
       
                url: "user_control.php",
                data: { 
                    "user_id":user_id,
                    "option":"update",
                    "name":$("#student_name").val(),
                    "ic_number": $("#ic_num").val(),
                    "birthday":$("#birthday").val(),
                    "matrix_num":$("#matrix_num").val(),
                    "email":$("#email").val(),
                    "phone_num":$("#phone_num").val().replace("+","") ,
                    "home_address":$("#home_address").val(),
                    "primary_school":$("#primary_school").val(),
                    "lower_secondary":$("#lower_secondary").val(),
                    "upper_secondary":$("#upper_secondary").val(),
                    "university":$("#university").val(),
                    "college":$("#college").val(),
                    "polytechnic":$("#polytechnic").val(),
                    "current_job":$("#current_job").val(),
                    "father_name":$("#father_name").val(),
                    "mother_name":$("#mother_name").val(),
                    "emergency_num":$("#emergency_num").val(),
                    "city":$("#city").val(),
                    "state":$("#state").val(),
                    "zip_code":$("#zip_code").val(),
                    "religion":$("#religion").val(),
                    "race":$("#race").val(),
                    "department":$("#department").val(),
                    "course":$("#course").val(),
                    "class":$("#class").val(),
                    "club":$("#club").val()
                },
                cache: false,
                type: "POST",
                success: function(response) {
                    if(response=="ok"){
                        $("#data_saved").modal("show");
                        $("#accept_btn").attr("disabled",false);
                    } else{console.log(response);}
                       
                },
                error: function(xhr) {
            
                }
            });
        }else{
            $("#existed_attr_text").html("Some form are not filled yet, please fill in all form before saving.");
            $("#existed_attr_dialog").modal("show");
            $("#accept_btn").attr("disabled",true);
        }
        
     
    }
   
}
function saveForm_user_info(type){
    
    if(!checkEmpty()){
        $("#data_saved").modal("show");
        $("#accept_btn").attr("disabled",false);
        if(type =="logout"){
            logout();
        }else{
            
            location.href = type;
        }
        
    }else{
        $("#existed_attr_text").html("Some form are not filled yet, please fill in all important form before saving or go to other page.");
        $("#existed_attr_dialog").modal("show");
        $("#accept_btn").attr("disabled",true);
    }
    
}
function anyinput(){
    $("#accept_btn").attr("disabled",false);
}
function checkEmpty(){
    var isempty = false;
    if($("#student_name").val()==""){
        isempty = true;
    }
    if($("#ic_num").val()==""){
        isempty = true;
    }
    if($("#birthday").val()==""){
        isempty = true;
    }
    if($("#matrix_num").val()==""){
        isempty = true;
    }
    if($("#phone_num").val()==""){
        isempty = true;
    }
    if($("#home_address").val()==""){
        isempty = true;
    }
    if($("#primary_school").val()==""){
        isempty = true;
    }
    if($("#lower_secondary").val()==""){
        isempty = true;
    }
    if($("#upper_secondary").val()==""){
        isempty = true;
    }
 
    if($("#polytechnic").val()==""){
        isempty = true;
    }
  
    if($("#father_name").val()==""){
        isempty = true;
    }
    if($("#mother_name").val()==""){
        isempty = true;
    }
    if($("#emergency_num").val()==""){
        isempty = true;
    }
    if($("#city").val()==""){
        isempty = true;
    }
    if($("#state").val()==""){
        isempty = true;
    }
    if($("#zip_code").val()==""){
        isempty = true;
    }
    if($("#religion").val()==""){
        isempty = true;
    }
    if($("#race").val()==""){
        isempty = true;
    }
    if($("#department").val()==""){
        isempty = true;
    }
    if($("#course").val()==""){
        isempty = true;
    }
    if($("#class").val()==""){
        isempty = true;
    }
    if($("#club").val()==""){
        isempty = true;
    }
    return isempty;
}

function reloadpg(){
    location.href = "home.html";
}
