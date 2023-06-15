var user_id = "";
var generated_page_id  = "";


function generate_page(){
    $('#page_created_dialog').modal({
        backdrop: 'static',
        keyboard: false
    })
   
    $.ajax({
       
        url: "page_generator.php",
        data: { 
            "user_id":user_id
            
        },
        cache: false,
        type: "POST",
        success: function(response) {
           // alert(response);
            if(response!="error"){
                generated_page_id= response;
              $('#page_created_dialog').modal('show');
                setTimeout(function(){ redirect_to_page(); }, 1000);
                }
        },
        error: function(xhr) {
    
        }
    });
}
function redirect_to_page(){
    $('#page_created_dialog').modal({
        backdrop: '',
        keyboard: true
    })
   
   window.open("form_manager.html?id="+encodeURIComponent(btoa(generated_page_id)), '_blank').focus();
    $('#page_created_dialog').modal('hide');

}


function read_form_maker_history(){
   
    $.ajax({
       
        url: "formHistory.php",
        data: { 
            user_id:user_id,
            option:"read_history"
             
        },
        cache: false,
        type: "POST",
        success: function(response) {
           //alert(response);
            var json = $.parseJSON(response);
            for(var x = 0;x<json.length;x++){
                appendFormHistoryHTML(json[x].page_title,json[x].page_date,encodeURIComponent(btoa(json[x].page_id)) );
            }
            
            $("#total_created_form").html((json.length));
        },
        error: function(xhr) {
    
        }
    });
  
}

function appendFormHistoryHTML(title,date,id){
    var html = ' <div class="row container pt-sm-4">'+
    '<a class="row border-secondary p-sm-3 rounded border border-outline-primary w-100 text-decoration-none" href="form_manager.html?id='+id+'" >'+
    '<div class="col-sm-9 text-primary">'+
    '<p>'+title+' </p></div>'+
    '<div class="col-sm-2 text-info">'+
    '<p>'+date+' </p></div>'+
    '</a></div>';
    //alert(html);

    $("#form_history").append(html);
}