function appendCustomFormOption_Binary(table_attr,title,firstval,secondval,thirdval,repeated){
   
    var htmlData =   '<div id="'+latest_index+'" class="border-primary pt-sm-1">'+
    '<div class="border-secondary p-sm-2 rounded border border-outline-primary">'+
     '<div class="row">'+
     '<div class="col-sm-1">'+
     '<a type="button" class=" btn-danger btn-lg " onclick="deleteOption(\''+latest_index+'\',\''+json_index+'\')">'+
       '<img class="img-responsive center-block" width="25" height="25" src="image/bin.png">'+
    '</a>'+
   '</div>'+
   '<div class="col-11 ">'+
    '<div class="row w-75 justify-content-between ">'+
    '<div class="col-sm-6 ">'+
    '<input type="text" class="form-control border-0 border-secondary text-danger" value = "'+table_attr+'" placeholder="Table Attribute Title" id="binary_opt_tableattr_title-'+json_index+'">'+
   
         '</div>'+
    '<div class="col-sm-6 ">'+
    '<input type="text" class="form-control border-0 border-secondary text-primary" value = "'+title+'" placeholder="Binary Title" id="binary_opt_title-'+json_index+'">'+
   
       '</div>'+
    '</div>'+
 
    '<div class="row w-100 py-sm-2 ">'+
      '<div class="col-sm-auto">'+
        '<input type="radio" class=" form-check-input px-sm-3 py-sm-3 border-primary"  name="radioYESNOsample-'+json_index+'">'+
      '</div>'+
      '<div class="col-sm-auto">'+
        '<input type="text" class="col-sm-4 form-control border-0 text-primary " placeholder="No" value="'+firstval+'" id="binary_opt_firstval-'+json_index+'">'+
        
      '</div>'+
      '<div class="col-sm-auto">'+
        '<input type="radio" class=" form-check-input px-sm-3 py-sm-3 border-primary " name="radioYESNOsample-'+json_index+'">'+
      '</div>'+
      '<div class="col-sm-auto">'+
        '<input type="text" class="col-sm-4 form-control border-0 text-primary" placeholder="Yes" value="'+secondval+'" id="binary_opt_secondval-'+json_index+'">'+
        
      '</div>'+  
      '<div class="col-sm-auto">'+
      '<input type="radio" class=" form-check-input px-sm-3 py-sm-3 border-primary" name="radioYESNOsample-'+json_index+'">'+
    '</div>'+
    '<div class="col-sm-auto">'+
      '<input type="text" class="col-sm-4 form-control border-0 text-primary " placeholder="Yes" value="'+thirdval+'" id="binary_opt_thirdval-'+json_index+'">'+
      
    '</div>'+  
    '</div>'+
        '</div>'+'</div>'+
        '</div>'+    
    '</div>';

    $("#form_field").append(htmlData);
    FormElement.push("custom");
    FormName.push(table_attr);
    
    CSV_header.push("binary");
    console.log(FormName);
    
    var max_length_data = FormElement.length;
    $("#total_opt").text(max_length_data);
    //{"type":"binary","title":"question title","startlbl":"Very Bad","endlbl":"Very Bad"}
    if(!repeated)
      custom_option_json.question.push({"jsonindex":json_index,"type":"binary","table_title":"table title","title":"question title","firstval":"No","secondval":"Yes","thirdval":"Maybe"});
    //alert("jsonindex"+json_index);
    latest_index++;
    json_index++;
   console.table(custom_option_json.question);

}


function appendCustomFormOption_Text(table_attr,title,repeated){
   
    var htmlData =   '<div id="'+latest_index+'" class="border-primary pt-sm-1">'+
    '<div class="border-secondary p-sm-2 rounded border border-outline-primary">'+
     '<div class="row">'+
     '<div class="col-sm-1">'+
     '<a type="button" class=" btn-danger btn-lg " onclick="deleteOption(\''+latest_index+'\',\''+json_index+'\')">'+
       '<img class="img-responsive center-block" width="25" height="25" src="image/bin.png">'+
    '</a>'+
   '</div>'+
        '<div class="col-11">'+
        '<div class="row w-75">'+
        '<div class="col-sm-6 ">'+
        '<input type="text" class="form-control border-0 border-secondary text-danger" value = "'+table_attr+'" placeholder="Table Attribute Title" id="text_opt_tableattr_title-'+json_index+'">'+
      
            '</div>'+
        '<div class="col-sm-6 ">'+
        '<input type="text" class="form-control border-0 text-primary" placeholder="Text Title" value="'+title+'" id="text_opt_title-'+json_index+'">'+
        
       '</div>'+
         '</div>'+
        '</div>'+
  
      '</div>'+    
    '</div>'+
    '</div>';

    $("#form_field").append(htmlData);
    FormElement.push("custom");
    FormName.push(table_attr);
    console.log(FormName);
    CSV_header.push("text");
    var max_length_data = FormElement.length;
    $("#total_opt").text(max_length_data);
    //{"type":"text","title":"question title"}
    if(!repeated){
      custom_option_json.question.push({"jsonindex":json_index,"type":"text","table_title":"table title","title":"question title"});
      
    }
      
    console.table(custom_option_json);
    latest_index++;
    json_index++;
    console.table(custom_option_json.question);

}


function appendCustomFormOption_Likert(table_attr,title,firstval,secondval,thirdval,fourthval,fifthval,repeated){
   
    var htmlData =      '<div id="'+latest_index+'" class="border-primary pt-sm-1">'+
    '<div class="border-secondary p-sm-2 rounded border border-outline-primary">'+
     '<div class="row">'+
     '<div class="col-sm-1">'+
     '<a type="button" class=" btn-danger btn-lg "  onclick="deleteOption(\''+latest_index+'\',\''+json_index+'\')">'+
       '<img class="img-responsive center-block" width="25" height="25" src="image/bin.png">'+
    '</a>'+
   '</div>'+
        '<div class="col-11 ">'+
          '<div class="row w-75 ">'+
          '<div class="col-sm-6 ">'+
        '<input type="text" class="form-control border-0 border-secondary text-danger" value = "'+table_attr+'" placeholder="Table Attribute Title" id="likert_opt_tableattr_title-'+json_index+'">'+
      
            '</div>'+
        '<div class="col-sm-6 ">'+
              '<input type="text" class="form-control border-0 border-secondary text-primary" value="'+title+'" placeholder="Likert Title" id="likert_opt_title-'+json_index+'">'+
          '</div>'+
       
          '<div class="row w-100 justify-content-center py-sm-2">'+
            '<input type="radio" name="radiosample'+json_index+'" class="col-sm-auto form-check-input px-sm-3 py-sm-3 m-sm-auto border-primary" >'+
            '<input type="radio" name="radiosample'+json_index+'"  class="col-sm-auto form-check-input px-sm-3 py-sm-3 m-sm-auto border-primary" >'+
            '<input type="radio" name="radiosample'+json_index+'"  class="col-sm-auto form-check-input px-sm-3 py-sm-3 m-sm-auto border-primary" >'+
            '<input type="radio" name="radiosample'+json_index+'"  class="col-sm-auto form-check-input px-sm-3 py-sm-3 m-sm-auto border-primary" >'+
            '<input type="radio" name="radiosample'+json_index+'"  class="col-sm-auto form-check-input px-sm-3 py-sm-3 m-sm-auto border-primary" >'+
        '</div>'+
        '<div class="row w-100 justify-content-sm-between ">'+
          '<div class="col-sm-2">'+
            '<input type="text" class="form-control border-0 border-secondary text-info" value="'+firstval+'" placeholder="Very Bad" id="likert_opt_firstval-'+json_index+'">'+
          '</div>'+
          '<div class="col-sm-2">'+
            '<input type="text" class="form-control border-0 border-secondary text-info" value="'+secondval+'"  placeholder="Average" id="likert_opt_secondval-'+json_index+'">'+
          '</div>'+
         
          '<div class="col-sm-2">'+
            '<input type="text" class="form-control border-0 border-secondary text-info" value="'+thirdval+'"  placeholder="Very Good" id="likert_opt_thirdval-'+json_index+'">'+
          '</div>'+
          '<div class="col-sm-2">'+
            '<input type="text" class="form-control border-0 border-secondary text-info" value="'+fourthval+'"  placeholder="Average" id="likert_opt_fourthval-'+json_index+'">'+
          '</div>'+
         
          '<div class="col-sm-2">'+
            '<input type="text" class="form-control border-0 border-secondary text-info" value="'+fifthval+'"  placeholder="Very Good" id="likert_opt_fifthval-'+json_index+'">'+
          '</div>'+
          
      '</div>'+
        '</div>'+
  
      '</div>'+    
    '</div>'+
    '</div>';

    $("#form_field").append(htmlData);
    FormElement.push("custom");
    FormName.push(table_attr);
    CSV_header.push("likert");
    console.log(FormName);
    
    var max_length_data = FormElement.length;
    $("#total_opt").text(max_length_data);
    //{"type":"text","title":"question title"}
    if(!repeated)
      custom_option_json.question.push({"jsonindex":json_index,"type":"likert","table_title":"table title","title":"question title","firstval":"Very Bad","secondval":"Bad","thirdval":"Average","fourthval":"Good","fifthval":"Very Good"});
    
    latest_index++;
    json_index++;
    
   console.table(custom_option_json.question);

}



function updateCustomForm(){
  var element_order = -1;
    for(var element of custom_option_json.question){
        
        if(element.type == "binary"){
         
            element.table_title =  $("#binary_opt_tableattr_title-"+element.jsonindex).val();
            element.title =  $("#binary_opt_title-"+element.jsonindex).val();
            element.firstval =  $("#binary_opt_firstval-"+element.jsonindex).val();
            element.secondval =  $("#binary_opt_secondval-"+element.jsonindex).val();
            element.thirdval =  $("#binary_opt_thirdval-"+element.jsonindex).val();
        
         
        }
        if(element.type == "text"){
          element.table_title =  $("#text_opt_tableattr_title-"+element.jsonindex).val();
          element.title =  $("#text_opt_title-"+element.jsonindex).val();
       
           
        }
        if(element.type == "likert"){ //title,startval,midval,endval
          element.table_title =  $("#likert_opt_tableattr_title-"+element.jsonindex).val();
         
            element.title = $("#likert_opt_title-"+element.jsonindex).val();
            element.firstval =  $("#likert_opt_firstval-"+element.jsonindex).val();
            element.secondval =  $("#likert_opt_secondval-"+element.jsonindex).val();
            element.thirdval =  $("#likert_opt_thirdval-"+element.jsonindex).val();
            element.fourthval =  $("#likert_opt_fourthval-"+element.jsonindex).val();
            element.fifthval =  $("#likert_opt_fifthval-"+element.jsonindex).val();
        }
      
        // to update element. get element type , then update based on element type.
    }
    var jsonstring = JSON.stringify(custom_option_json);
  


    // to data. update all element then save to json string
}