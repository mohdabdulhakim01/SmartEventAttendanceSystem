
function get_user_data(){
    var matrix_number = $("#user_matrixnum").val();
    $("#user_matrixnum").val(matrix_number.toUpperCase());

   pull_user_data_name_id(matrix_number);
}

// pull id and username based on matrix number if not found say matrix number not found. if found set current_user_id to userid
//

function pull_user_data_name_id(matrix_number){
    $.ajax({


        url: "user_form_control.php",
        data: {
            page_id: current_page_id,
            target_matrix_num:matrix_number,
            option: "read_user_name_id"
        },
        cache: false,
        type: "POST",
        async:false,

        success: function (response) {
           // alert(response);
            var json = $.parseJSON(response);
            var username = "";
            var user_id = "";
           
            if(json.length>0){
             // alert("x"+response);
                username = json[0].name;
                user_id = json[0].id;
                insert_data_info(username,user_id);
                
            }
        },
        error: function (xhr) {  }
    });
}

function insert_data_info(username,user_id){
    var html = '<div class="border border-3 border-danger rounded rounded-2"><h5 class="px-3 py-1">'+username+'</h5></div>';
    $("#user_data_info").empty();
    $("#user_data_info").append(html);
    signed = false;
    
    current_user_id = user_id;
   
    $.when(checkAttended()).then(function(){
        if(signed){
            complete_event();
        }else{ add_status_attendant();
            $("#sign_form_btn").show();}
       
    });
   
}