var db_repulse = "";
function get(name){ // https://stackoverflow.com/questions/831030/how-to-get-get-request-parameters-in-javascript
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }
 var timer = 0;
 var pulse_list = [0,0,0,0,0,0];
var current_switch = false;
var last_min_pulse = 0;
var strict_mode_sec = 3;
var general_mode_sec = 7;
var current_timer = 10;
var general_pulse_max = 3;
var current_max_pulse = 3;
var strict_pulse_max = 1;
var is_switch_clicked = false;
var before_clicked_state_pulse = "false";
var before_clicked_state_ip_sign = "false";

function pulse_switch(){
    before_clicked_state_pulse = $('#pulse_switch').bootstrapSwitch('state').toString();
    before_clicked_state_ip_sign = $('#ip_signin').bootstrapSwitch('state').toString();
   // alert(current_timer);
   update_switch_status();
      
    if(current_switch==false){
        current_switch = true;
        //$("#control_icon").text("⬛");
        $("#control-btn").attr("src","image/stop.png");
        $("#control-btn-modal").attr("src","image/stop.png");
        
       
        pulse_beat();
    }else{
       
        current_switch = false;

        if(is_switch_clicked){ // restart share
          // alert("here");

            is_switch_clicked = false;
            setTimeout(function(){$("#control-btn").hide();$("#wait_switch_swap").toggleClass('d-none');
                                 $("#control-btn-modal").hide();$("#wait_switch_swap-modal").toggleClass('d-none');
                                    },700);
            setTimeout(function(){$("#control-btn").show();$("#wait_switch_swap").toggleClass('d-none'); $("#control-btn").attr("src","image/play.png");
                                $("#control-btn-modal").show();$("#wait_switch_swap-modal").toggleClass('d-none'); $("#control-btn-modal").attr("src","image/play.png");   
                                },1000);
            //setTimeout(function(){$("#control-btn").hide();$("#wait_switch_swap").toggleClass('d-none');},1300);
          
            setTimeout(function(){$("#control-btn").show();$("#control-btn").attr("src","image/play.png"); ;
                                    $("#control-btn-modal").show();$("#control-btn-modal").attr("src","image/play.png"); ;pulse_switch();
                                    },1600);
            

        }else{
            $("#control-btn").attr("src","image/play.png");
            $("#control-btn-modal").attr("src","image/play.png");
        }
        
        //$("#control_icon").text("▶");
        
       is_switch_clicked = false;
      
    }
}

function resetpin(){

    $.ajax({
        url: "pulse_bridge.php",
        
        data: { 
            "option":"modify",
            "page_id":current_page_id,
            "pulse":""
        },
        cache: false,
        type: "POST",
        success: function(response) {
         //  alert("fixed bit : "+response);
        },
        error: function(xhr) {
    
        }
    });

}
function nofunction(){}
 function pulse_beat(){
    if(current_switch==true){
        // pulse on
        pulse_generator();
        var combine_pulse = "";
        for(var x = 0;x<6;x++){
            if(pulse_list[x] == 1){
                $("input[type='radio'][name='pulse-"+x+"']").attr("checked", true);
                $("input[type='radio'][name='pulse-"+x+"-modal']").attr("checked", true);
            }else{
                $("input[type='radio'][name='pulse-"+x+"']").attr("checked", false);
                $("input[type='radio'][name='pulse-"+x+"-modal']").attr("checked", false);
            }
            combine_pulse +=pulse_list[x].toString();
        }
        $("#current_pulse").text(combine_pulse);
        $("#current_pulse_modal").text(combine_pulse);
        update_pulse_in_db(combine_pulse);
        timer = current_timer;
        pulse_notify_status();
        
    }else{
      
        
        
        
    }
 }
 function update_pulse_in_db(combine_pulse){
   //alert("updatedb"+combine_pulse);
    $.ajax({
        url: "pulse_bridge.php",
        
        data: { 
            "option":"modify",
            "page_id":current_page_id,
            "pulse":combine_pulse
        },
        cache: false,
        type: "POST",
        success: function(response) {
           //alert("fixed bit : "+response);
        },
        error: function(xhr) {
    
        }
    });
 }

 function pulse_listener(){


    $.ajax({
       
        url: "pulse_bridge.php",
        data: { 
            "option":"read",
            "page_id":current_page_id
           
        },
        cache: false,
        type: "GET",
        success: function(response) {
            db_repulse = response.toString();
        },
        error: function(xhr) {
    
        }
    });
    //console.log("listening.. . .");
    setTimeout(function(){ pulse_listener(); }, 500);
   
 }

 function pulse_auth(){
     var combine_client_pulse = "";
     for(var x = 0;x<6;x++){
        if ($("input[name=pulse-"+x+"]:checked").length > 0) {
            combine_client_pulse +="1";
        }else{
            combine_client_pulse +="0";
        }
     }
     for(var y = 0;y<6;y++){
      
        $("input[type='radio'][name='pulse-"+y+"']").prop('checked', false);
     }
     
   
    
    // alert(responses+"=="+combine_client_pulse);
     
     if(combine_client_pulse == db_repulse){
        alert("Matching !");
     }else{
        //alert(db_repulse+"=="+combine_client_pulse);
        alert("Not Matching !");
        
     }
     
   
 }

 function pulse_notify_status(){
     $("#current_timer").text(timer.toString());
     $("#current_timer_modal").text(timer.toString());
     timer--;
     optional_switch();
     console.log(timer);
     if(current_switch==true){
        if(timer==-1){
            pulse_beat();
           
           
       }else{
           setTimeout(function(){ pulse_notify_status(); }, 700);
       }
     }else{
       $("#current_timer_modal").text("😑");
       $("#current_timer").text("😑");
       resetpin();
     }
 
    
 }
 function pulse_generator(){
     
    
        
        pulse_list = [0,0,0,0,0,0];
        var count_alive =0;
        var max = 5;
        var min = 0;
        // lock 3 on and 2 off. if number already on. leave 
        var random_dot_live =  0;
        
        while(last_min_pulse==random_dot_live){
            random_dot_live =  current_pick = Math.floor(Math.random() * (current_max_pulse - current_max_pulse + 1)) + current_max_pulse;
           // alert(random_dot_live);
        }
        while(count_alive<random_dot_live){
            var current_pick = Math.floor(Math.random() * (max - min + 1)) + min;
            if(pulse_list[current_pick]==0){
                pulse_list[current_pick]=1;
                count_alive+=1;
            
            }
    }
    
 }

 function present_mode(){
    $("#page_title_modal").text($("#page_title").val());
    $('#pulse_modal').modal('show');
 }

 function update_ip_signin_status(curr_value){
    $.ajax({
        url: "user_form_control.php",
        
        data: { 
            "option":"update_ip_sign_status",
            "page_id":current_page_id,
            "single_ip_sign_status":curr_value

        },
        cache: false,
        type: "POST",
        success: function(response) {
        // alert("status : "+response);
        },
        error: function(xhr) {
    
        }
    });
 }

 function optional_switch(){
    var pulse_mode = $('#pulse_switch').bootstrapSwitch('state');
    var ip_sign_mode = $('#ip_signin').bootstrapSwitch('state');

    if(before_clicked_state_pulse!=pulse_mode.toString()){
        
    //    alert(before_clicked_state_pulse+" = "+mode_state.toString());
        before_clicked_state_pulse = pulse_mode.toString();
        current_switch = true;
        is_switch_clicked = true;
        pulse_switch();
    }
    if(before_clicked_state_ip_sign!=ip_sign_mode.toString()){
        
        //    alert(before_clicked_state_pulse+" = "+mode_state.toString());
            before_clicked_state_ip_sign = ip_sign_mode.toString();
            current_switch = true;
            is_switch_clicked = true;
            pulse_switch();
        }
    
//    console.log(mode_state);
   
 

 }

 function update_switch_status(){
    var pulse_mode = $('#pulse_switch').bootstrapSwitch('state');
    var ip_sign_mode = $('#ip_signin').bootstrapSwitch('state');


    if(pulse_mode==false){
        current_timer = general_mode_sec;
        current_max_pulse = general_pulse_max;
    }else{
        current_timer = strict_mode_sec;
        current_max_pulse = strict_pulse_max;
    }
    if(ip_sign_mode==false){
        update_ip_signin_status("false");
    }else{
        update_ip_signin_status("true");
    }
 }