function isLogged(){
   
    if(readCookie("user_id")==null){
        location.href = "login.html";
    }else{
        return true;
    }
    
}
function logout(){
    var logoutcheck = confirm("Are you sure to logout now ?, Any unsave data will be lost.");
    if(logoutcheck==true){
        eraseCookie("user_id");
    location.href = "login.html";
    }
    
}

function isFormOwnerCorrect(page_id){
    page_id = decodeURIComponent(get("id"));
    page_id = atob (page_id);
    var user_id = readCookie("user_id");
    $.ajax({

        
        url: "auth.php",
        data: {
            option:"page_info",
            page_id:page_id,
            user_id:user_id
        },
        cache: false,
        type: "POST",
        
        success: function(response) {
            //alert(response);
         if(response=="not_ok"){
             alert("the current page is not under your profile. Please create your own form !");
             location.href = "page_maker.html";
         }
        }
        ,error: function(xhr) {}
        });
}

