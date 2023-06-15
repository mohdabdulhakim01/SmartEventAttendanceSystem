function login_auth() {

    $("#form_login").submit(function(e) {
        e.stopImmediatePropagation();
        
        
        var form = $(this);
        var url = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize() + "&option=login"
                , // serializes the form's elements.
            success: function(data) {
                //alert(data);
                var jsondata = JSON.parse(data);
                var res_status = jsondata.status;

               
                if (res_status == "err" || res_status == "not_ok") {
                    $("#login_status").html("Email not exist or Wrong Password !");
                    $("#login_status_modal").modal("show");
                  
                   
                } else if(res_status=="ok"){ 
                    var res_id = jsondata.id;
                    storeUserLogInfo(res_id);
                    $("#login_status").html("Login Successfully !");
                   $("#login_status_modal").modal("show");
                   setTimeout(function(){ location.href = "home.html";},1000); 
                }else {
                    $("#login_status").html("Unknown Error Occured");
                    $("#login_status_modal").modal("show");
                }
            }
        });
        e.preventDefault();
        return false;
    });
   

    // alert("hello world !");
}

function register_auth() {

    $("#form_register").submit(function(e) {
        e.stopImmediatePropagation();
        var password = $("#password").val();
        var confirm_password = $("#confirmpassword").val();
       // alert("password:"+password+" confirmpass:"+confirm_password);
        if(password==confirm_password){
            
             var form = $(this);
            var url = form.attr('action');
            
            $.ajax({
                type: "POST",
                url: url,
                data: form.serialize() + "&option=register"
                    , // serializes the form's elements.
                success: function(data) {
                    //alert('"'+data+'"');
                    if (data == "err" || data == "not_ok") {
                        $("#reg_status").html("Email already exist or some error occured !");
                        $("#reg_status_modal").modal("show");
                      
                       
                    }  else if(data=="ok"){ 
                        $("#reg_status").html("Registration Successfully !");
                        $("#reg_status_modal").modal("show");
                        setTimeout(function(){location.href = "login.html";},1000); 
                     }else {
                        $("#reg_status").html("Unknown Error Occured");
                        $("#reg_status_modal").modal("show");
                    }
                }
            });
            e.preventDefault();
        
        }else{
            $("#password").val("");
            $("#confirmpassword").val("");
            $("#reg_status").html("Password not match for validation !");
            $("#reg_status_modal").modal("show");
            
        }
        return false;
       
    });
   

    // alert("hello world !");
}

function storeUserLogInfo(id_val){
    // store email and password
    //var email_val = $("#email").val();
    //var pass_val = $("#password").val();
    eraseCookie("user_id");
    createCookie("user_id",id_val,30);
    //createCookie("password",pass_val,30);

}