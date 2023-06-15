

function read_signed_history(){
  
    $.ajax({
       
        url: "formHistory.php",
        data: { 
            user_id:user_id,
            option:"read_signed_history"
             
        },
        cache: false,
        type: "POST",
        success: function(response) {
           //alert(response);
            var json = $.parseJSON(response);
            for(var x = 0;x<json.length;x++){
                appendSignHistoryHTML(json[x].page_title,json[x].page_date,encodeURIComponent(btoa(json[x].page_id)) );
            }
        },
        error: function(xhr) {
    
        }
    });
    
}


function appendSignHistoryHTML(title,date,id){
    var html = ' <div class="row container pt-sm-4">'+
    '<a class="row border-secondary p-sm-3 rounded border border-outline-primary w-100 text-decoration-none" href="user_form.html?id='+id+'" >'+
    '<div class="col-sm-9">'+
    '<h5>'+title+' </h5></div>'+
    '<div class="col-sm-2">'+
    '<h5>'+date+' </h5></div>'+
    '</a></div>';
    //alert(html);

    $("#signed_history").append(html);
}