var combine_pulse = "";
var pulse_list = [0, 0, 0, 0, 0, 0];
var current_page_id = "";
var current_user_id = "";
var default_form_element = "";
var default_form_name = "";
var default_form_request = [];
var attendState = 0;
var signed = false;
var old_bit = "";
var answer = [];
var form_element_raw = "";
var FormElement = [];
var FormName = [];
var custom_option = '{"question":[]}';
var custom_option_json = $.parseJSON(custom_option);
var latest_index = 0;
var current_ip = 0 ;
var json_index = 0;
var current_image_logo_path = "";
var isProfile_ContainEmpty = false;
var answer_json = '{"answer":[],"element":[]}';
var answer_object = $.parseJSON(answer_json);
var loadonce = false;

var pg_request_iteration = 0;
var manual_signer=false;
get_current_ip();




function pull_current_id() {
    //console.log("reaid");

    try {
        current_page_id = decodeURIComponent(get("id"));
        current_page_id = atob(current_page_id);
    } catch (e) {
        alert("Page not found ! ");
        location.href = "page_error.html";
    }





    if (current_page_id == "") {
        alert("page not exist !");
    }

}

function show_requirement() {
    $("#all_form_request_option").modal("show");
}



function checkAttended() {
    //
    // check attend and sign status
    
    $.ajax({


        url: "userAttendantStatus.php",
        data: {
            user_id: current_user_id,
            page_id: current_page_id,
            option: "read"
        },
        cache: false,
        type: "POST",
        async:false,

        success: function (response) {
           // alert(response);
         //   console.log("id ? "+current_user_id);
            
             get_iteration_number();
             var json = "";
             var current_page_iteration = pg_request_iteration;
            try{json = $.parseJSON(response);}catch(e){} 
            var user_sign_iteration = 1;
           // alert("attend"+json.length);
            if (json.length == 0) {
                attendState = 0;
                
                

            } 
            else {
                console.log(current_page_iteration+","+user_sign_iteration);
                user_sign_iteration = json[0].iteration;
                if(current_page_iteration==user_sign_iteration){
                    // alert(json[0].sign_status+ " stat");
                     attendState = 1;
                     //alert(json[0].sign_status+ " stat");
                     if (json[0].sign_status == "1") { // if 1 then hide the sign button
                         //signed = true;
                         signed = true;
                      // alert("signed !");
                     }else{
                         signed = false;
                     }
                }
              

            }
           
               

        },
        error: function (xhr) {

        }
    });

    // alert("Sign in done !");
}
function get_iteration_number(){
    $.ajax({


        url: "userAttendantStatus.php",
        data: {
            user_id: current_user_id,
            page_id: current_page_id,
            option: "read_pg_iteration"
        },
        cache: false,
        type: "POST",
        async:false,

        success: function (response) {pg_request_iteration = response;},
        error: function (xhr) {  }
    });
}
function get_current_ip(){
    
    $.ajax({
        url:"getip.php",
        type:"GET",
     
         async: false,
        success:function(response){
            
            current_ip = response;
        
           
          
        },
        error:function(xhr){
           //var data = JSON.stringify(xhr);
          //  alert("xx"+data);
        }
        
    });
    if(current_ip==""){
        alert("You are offline !");
    }
}
function read_form_data() { // this use to able user that signed to review the form requirement back
    $.ajax({

        url: "user_form_control.php",
        data: {
            "option": "read",
            "page_id": current_page_id

        },
        cache: false,
        async:false,
        type: "POST",
        success: function (response) {
            //alert(response);
            var json = $.parseJSON(response);
            $("#event_title").text(json[0].page_title);
            $("#event_date").text(json[0].page_date);
            document.title = (json[0].page_title);

            default_form_element = "";
            default_form_name = "";
            default_form_element = json[0].default_form_element;
            default_form_name = json[0].default_form_name;
            form_element_raw = json[0].form_element;
            current_image_logo_path = json[0].form_logo;
            load_image_logo();
            //alert(default_form_element);
        },
        error: function (xhr) {

        }
    });
    if (loadonce == false) {
        setTimeout(function () {
            reload_form_maker_data_sign();
        }, 100);
        loadonce = true;


    }

    element_requested();
    question_opt_requested();
}

function read_form_provider_info() {
   // console.log("reaid");
    // alert(current_page_id);
    isLogged();
    current_user_id = readCookie("user_id");
    read_form_data();
   // alert(signed);

    if (!current_page_id == "") {
        if (!signed) {
            $.ajax({

                url: "user_form_control.php",
                data: {
                    "option": "read",
                    "page_id": current_page_id

                },
                cache: false,

                type: "POST",
                success: function (response) {
                    // alert(response);
                    try {
                        var json = $.parseJSON(response);
                        var page_title = json[0].page_title;
                        document.title = (json[0].page_title);
                       //alert(page_title.length);
                       //Kehadiran untuk Anugerah Piala World CUP hehe  Yang dipertuan Agong Lee Chong Wang 
                        if(page_title.length>20){
                            
                            $("#event_title").css("font-size","15px");
                        }
                        $("#event_title").html(json[0].page_title);
                        $("#event_date").text(json[0].page_date);
                        pulse_check(json[0].pulse_val);
                        bitTracker(json[0].pulse_val);
                        default_form_element = "";
                        default_form_name = "";
                        default_form_element = json[0].default_form_element;
                        default_form_name = json[0].default_form_name;
                    } catch (e) {
                        alert("Page not found ! ");
                        location.href = "page_error.html";
                    }
                    //alert(default_form_element);
                },
                error: function (xhr) {

                }
            });


            element_requested();
            question_opt_requested();
            //console.log(default_form_request);
            setTimeout(function () {
                read_form_provider_info();
            }, 200);
        } else {
           // alert("signed");
            complete_event();
        }

    }


}

function pulse_converter() {
    combine_pulse = "";
    for (var x = 0; x < 6; x++) {
        if ($("input[name=pulse-" + x + "]:checked").length > 0) {
            combine_pulse += "1";
        } else {
            combine_pulse += "0";
        }
    }
}

function pulse_check(host_pulse) {
    pulse_converter();
    checkAttended();
    
    $("#pulse_code").text(host_pulse);
    if (attendState == 0) {
        if (combine_pulse == host_pulse) {
            attendState = 1;
            add_status_attendant();


            //alert(combine_pulse+"="+host_pulse);



        } else {
            lockSignButton();
        }
    }
    if (attendState == 1) {

        releaseSignButton();
    }

}

function releaseSignButton() {
    
    if(!manual_signer){
        $("#sign_form_btn").show();
        $("#pulse_auth").hide();
    }else{
        $("#sign_form_btn").show();
        $("#pulse_auth").hide();
    }
   
}

function lockSignButton() {
    if(!manual_signer){
       $("#sign_form_btn").hide()

        $("#pulse_auth").show();
    }else{
       $("#sign_form_btn").hide();
        $("#pulse_auth").hide();
    }

}

function complete_event() {
    if(!manual_signer){
        $("#sign_form_btn").hide();
        $("#pulse_auth").hide();
        
    }else{
        $("#sign_form_btn").hide();
        $("#pulse_auth").hide();
    }
  
    $("#signed_prompt").modal("show");

}

function bitTracker(newbit) {
    // if new bit and old bit are same then reset pulse ui
    if (old_bit != newbit) {
        //alert("bit are diff");
        old_bit = newbit;
        for (var y = 0; y < 6; y++) {

            $("input[type='radio'][name='pulse-" + y + "']").prop('checked', false);
        }

    }
}

function pull_answer() {
    for (var y = 0; y < Object.keys(answer_object.answer).length; y++) { // reset all answer to avoid garbage data after modification
        answer_object.answer.pop();
    }
    for (var x = 0; x < answer_option_order_id.length; x++) {

        var answer = "";
        if (answer_type_order_id[x] == "radio") {
            answer = $('input[name="' + answer_option_order_id[x] + '"]:checked').val();
        }
        if (answer_type_order_id[x] == "text") {
            answer = $("#" + answer_option_order_id[x]).val();
        }

        answer_object.answer.push(answer);
    }
}

function signForm() {
    pull_answer();
    checkAttended();
    isProfile_ContainEmpty = false;
    is_user_info_empty();
    //alert(isProfile_ContainEmpty);
    if(!isProfile_ContainEmpty){
        if(!signed){
        
            var sign_status = "";
            $.ajax({
        
        
                url: "signForm.php",
                data: {
                    page_id: current_page_id,
                    user_id: current_user_id,
                    user_ip_addr: current_ip,
                    answer: JSON.stringify(answer_object),
                },
                cache: false,
                async:false,
                type: "POST",
        
                success: function (response) {
                    sign_status = response;
                    //alert(JSON.stringify(sign_status));
                 // alert(response);
                },
                error: function (xhr) {}
            });
            if(sign_status=="saved"){

                   update_attendant_status();
                    complete_event();
                
            }
            if(sign_status=="wrong ip"){
                alert("Sign fail !. Please use another device to sign form !");
            }
        }else{
            complete_event();
        }
    }else{
        $("#existed_attr_text").html("Please complete all important information in your profile first before sign in !");
        $("#existed_attr_dialog").modal("show");

    }
   
    
    // location.href = "user_form.html";
}


// current_signed_state

function update_attendant_status() {

    
    $.ajax({
        url: "userAttendantStatus.php",
        data: {
            page_id: current_page_id,
            user_id: current_user_id,
            user_ip_addr:current_ip,
            option: "update",
            current_signed_state: attendState
        },
        cache: false,
        type: "POST",

        success: function (response) {
           //alert("attend : "+response);


        },
        error: function (xhr) {

        }
    });
}

function switch_single_ip_sign_auth() {

    
    $.ajax({
        url: "userAttendantStatus.php",
        data: {
            page_id: current_page_id,
            user_id: current_user_id,
            user_ip_addr:current_ip,
            option: "update",
            current_signed_state: attendState
        },
        cache: false,
        type: "POST",

        success: function (response) {
           // alert("attend : "+response);


        },
        error: function (xhr) {

        }
    });
}

function add_status_attendant() {
  //  alert(current_user_id);
    $.ajax({
        url: "userAttendantStatus.php",
        data: {
            page_id: current_page_id,
            user_ip_addr:current_ip,
            user_id: current_user_id,
            option: "add",

        },
        cache: false,
        type: "POST",

        success: function (response) {
           // alert("attend : "+response);


        },
        error: function (xhr) {

        }
    });
}


function get(name) { // https://stackoverflow.com/questions/831030/how-to-get-get-request-parameters-in-javascript
    try {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);

    } catch (e) {
        alert("Page not found ! ");
        location.href = "page_error.html";
    }
}



function element_requested() {

    raw_element = default_form_element.split(",");
    for (var x = 0; x < raw_element.length; x++) {
        // any element equal to default form element requested by provider will be turn on as requested data

    }
    // alert(default_form_request);;

}

function question_opt_requested() {

    $("#form_question_opt").empty();

    raw_element = default_form_name.split(",");
    for (var x = 0; x < raw_element.length; x++) {
        var html = '    <div id="1" class="row border-primary pt-sm-1 container">' +
            '<div class="col-sm-auto border-secondary  p-sm-4 rounded border border-outline-primary w-100" ><h4>' +
            '<span class="text-primary pl-sm-3 pr-sm-3 py-sm-2" >' + raw_element[x] + '</span>' +
            '</h4>' +
            '</div>' +
            '</div>';
        $("#form_question_opt").append(html);
    }

}

function reload_form_maker_data_sign() {
    FormElement = [];
    FormName = [];
    custom_option_json = [];
    answer_json = '{"answer":[],"element":[]}';
    answer_object = $.parseJSON(answer_json);
    var default_form_element_data = default_form_element.split(",");
    var default_form_name_data = default_form_name.split(",");
    //alert(default_form_name_data);
    try {
        custom_option_json = $.parseJSON(form_element_raw);
    } catch (err) {}

    var json_curr_index = 0;
    if (default_form_element_data.length > 1) {
        for (var x = 0; x < default_form_element_data.length; x++) {

            if (default_form_element_data[x] == "custom") {
                //alert(default_form_element_data[x]);
                console.log(custom_option_json.question[json_curr_index]);
                // get customoption type. then render html based on type
                renderCustomOption(custom_option_json.question[json_curr_index]);

                json_curr_index++;
            }
            // any element equal to default form element requested by provider will be turn on as requested data
            answer_object.element.push(default_form_element_data[x]);
        }
    }


    // console.log(custom_option_json.question);
    // alert("roses");


}


function renderCustomOption(json_data) {

    if (json_data.type == "binary") {
        appendCustomFormOption_Binary(json_data.table_title, json_data.title, json_data.firstval, json_data.secondval,json_data.thirdval);
    }
    if (json_data.type == "likert") {
        appendCustomFormOption_Likert(json_data.table_title, json_data.title, json_data.firstval, json_data.secondval,json_data.thirdval,json_data.fourthval, json_data.fifthval);
    }
    if (json_data.type == "text") {
        appendCustomFormOption_Text(json_data.table_title, json_data.title);
    }

}


function load_image_logo(){
    $("#current_picture").attr("src",current_image_logo_path);

}

function is_user_info_empty(){
    
    $.ajax({
        
        url: "user_control.php",
        data: { 
            "option":"read",
            "user_id":current_user_id
           
        },
        cache: false,
        async:false,
        type: "POST",
        success: function(response) {
            
           // alert(response);
            var json = $.parseJSON(response);
            
            if(json[0].name.length===0){
                isProfile_ContainEmpty = true;
              
            }
            if(json[0].ic_number .length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].birthday .length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].matrix_num.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].email.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].phone_num.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].address.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].primary_school.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].lower_secondary.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].upper_secondary.length===0){
                isProfile_ContainEmpty = true;
            }
          

            if(json[0].polytechnic.length===0){
                isProfile_ContainEmpty = true;
            }
           
            if(json[0].father_name.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].mother_name.length===0){
                isProfile_ContainEmpty = true;
            }
            if(json[0].emergency_number.length===0){
                isProfile_ContainEmpty = true;
            }
        }
    });
    
}