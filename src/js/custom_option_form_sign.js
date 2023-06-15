answer_option_order_id = [];
answer_type_order_id = [];

function appendCustomFormOption_Binary(table_attr,title,firstval,secondval,thirdval){
  var first_class_data = "d-none",second_class_data = "d-none",thirdval_class_data = "d-none";
  var available_for_checked = ["","",""];
  var available_to_be_check = [false,false,false];
  var total_available = 0;
   if(firstval!=""){
     first_class_data = "";
     total_available++;
     available_to_be_check[0] = true;
   }

   if(secondval!=""){
    second_class_data = "";
    total_available++;
    available_to_be_check[1] = true;

  }
  if(thirdval!=""){
    thirdval_class_data = "";
    total_available++;
    available_to_be_check[2] = true;
  }
  if(total_available>0){
    if(available_to_be_check[1]==true){
      available_for_checked[1] = "checked"
    }else{
      for(var x =available_to_be_check.length-1;x>-1;x--){
        if(available_to_be_check[x]==true){
          available_for_checked[x] = "checked";
          break;
        }
      }
    }
  }
    var htmlData =  '<div id="'+latest_index+'" class="border-primary pt-sm-1">'+
    '<div class="px-2 py-3">'+
        '<div class="row">'+
              '<h5>'+title+'</h5>'+
        '</div>'+
    
            '<div class="row w-100 px-3 py-2 justify-content-between">'+
                '<div class="col-auto '+first_class_data+' py-2">'+
                    '<div class="row">'+
                        '<div class="col-auto">'+
                              '<input class="form-check-input border-primary" type="radio" name="radioYESNOsample-'+json_index+'" value="'+firstval+'" '+available_for_checked[0]+'>'+
                        '</div>'+
                    '<div class="col-auto">'+
                              '<h6>'+firstval+'</h6>'+
                        '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-auto '+second_class_data+' py-2">'+
            '<div class="row">'+
                '<div class="col-auto">'+
                      '<input class="form-check-input border-primary" type="radio" name="radioYESNOsample-'+json_index+'" value="'+secondval+'"'+available_for_checked[1]+'>'+
                '</div>'+
            '<div class="col-auto">'+
                      '<h6>'+secondval+'</h6>'+
                '</div>'+
        '</div>'+
    '</div>'+
    '<div class="col-auto '+thirdval_class_data+' py-2">'+
    '<div class="row">'+
        '<div class="col-auto">'+
              '<input class="form-check-input border-primary" type="radio" name="radioYESNOsample-'+json_index+'" value="'+thirdval+'"'+available_for_checked[2]+'>'+
        '</div>'+
    '<div class="col-auto">'+
              '<h6>'+thirdval+'</h6>'+
        '</div>'+
'</div>'+
'</div>'+
        '</div>'+
    '</div>'+
    '</div>';


    $("#form_field").append(htmlData);
   answer_option_order_id.push('radioYESNOsample-'+json_index);
   answer_type_order_id.push("radio");
    latest_index++;
    json_index++;

}


function appendCustomFormOption_Text(table_attr,title){
   
    var htmlData =   '<div id="'+latest_index+'" class="py-3">'+
     '<div class="row px-2">'+
        '<h5>'+title+'</h5>'+
        '</div>'+
  
      '<div class="row p-sm-2 w-100 container">'+
      '<input type="text" class="form-control border-1 border-dark text-dark bg-white "  value = "" id="text_opt_answer-'+json_index+'">'+
      '</div>'+
            '</div>'+   
    '</div>'+
    '</div>';

    $("#form_field").append(htmlData);
    answer_type_order_id.push("text");
    answer_option_order_id.push('text_opt_answer-'+json_index);
    latest_index++;
    json_index++;

}


function appendCustomFormOption_Likert(table_attr,title,firstval,secondval,thirdval,fourthval,fifthval){
   
  var first_class_data = "d-none",second_class_data = "d-none",thirdval_class_data = "d-none",fourth_class_data = "d-none",fifth_class_data = "d-none";
  var available_for_checked = ["","","","",""];
  var available_to_be_check = [false,false,false,false,false];
  var total_available = 0;
   if(firstval!=""){
     first_class_data = "";
     total_available++;
     available_to_be_check[0] = true;
   }

   if(secondval!=""){
    second_class_data = "";
    total_available++;
    available_to_be_check[1] = true;

  }
  if(thirdval!=""){
    thirdval_class_data = "";
    total_available++;
    available_to_be_check[2] = true;
  }
  if(fourthval!=""){
    fourth_class_data = "";
    total_available++;
    available_to_be_check[3] = true;
  }
  if(fifthval!=""){
    fifth_class_data = "";
    total_available++;
    available_to_be_check[4] = true;
  }
  if(total_available>0){
    if(available_to_be_check[4]==true){
      available_for_checked[4] = "checked"
    }else{
      for(var x =available_to_be_check.length-1;x>-1;x--){
        if(available_to_be_check[x]==true){
          available_for_checked[x] = "checked";
          break;
        }
      }
    }
  }
    var htmlData =   '<div id="latest_index" class="py-2 px-2">'+
     
    '<div class="row">'+
   '<h5>'+title+'</h5>'+
 '</div>'+
      
   '<div class="row px-2 py-2 justify-content-between pb-3">'+
     '<div class="col-auto '+first_class_data+'">'+
       '<input type="radio" class="form-check-input border-primary" name="radiosample'+json_index+'" value="'+firstval+'">'+
     '</div>'+
     '<div class="col-auto '+second_class_data+'">'+
       '<input type="radio" class="form-check-input border-primary" name="radiosample'+json_index+'" value="'+secondval+'">'+
     '</div>'+
     '<div class="col-auto '+thirdval_class_data+'">'+
       '<input type="radio" class="form-check-input border-primary" name="radiosample'+json_index+'" value="'+thirdval+'">'+
     '</div>'+
     '<div class="col-auto '+fourth_class_data+'">'+
       '<input type="radio" class="form-check-input border-primary" name="radiosample'+json_index+'" value="'+fourthval+'">'+
     '</div>'+
     '<div class="col-auto '+fifth_class_data+'">'+
       '<input type="radio" class="form-check-input border-primary" name="radiosample'+json_index+'" value="'+fifthval+'" checked>'+
     '</div>'+
   '</div>'+
   
        
       '<div class="row w-100 justify-content-between py-2 border-top border-1 border-secondary ">'+
         
         '<h6 class="col-2 '+first_class_data+'">'+firstval+'</h6>'+
     '<h6 class="col-2 '+second_class_data+'">'+secondval+'</h6>'+
     '<h6 class="col-2 '+thirdval_class_data+'">'+thirdval+'</h6>'+
     '<h6 class="col-2 '+fourth_class_data+'">'+fourthval+'</h6>'+
     '<h6 class="col-2 '+fifth_class_data+'">'+fifthval+'</h6>'+
     '</div>'+

 
     '</div>' ;

    $("#form_field").append(htmlData);
    answer_type_order_id.push("radio");
    answer_option_order_id.push('radiosample'+json_index);
    latest_index++;
    json_index++;

}






