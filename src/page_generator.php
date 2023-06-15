<?php

include("connect.php");



$conn = new mysqli($servername, $username, $password,$dbname);

if(isset($_POST)=="user_id"){
    $user_id = $_POST["user_id"];
    $generated_page_id = rand(100000,9999999);
    create_page($user_id,$generated_page_id);

}


function create_page($user_id,$page_id){
    global $conn;
    
    $date_formatted = date("d/m/Y");
    $sql = "INSERT INTO pageform (page_id, user_id,page_title,page_date,iteration,form_logo,default_form_element,default_form_name,pulse_val,form_element,single_ip_sign_status)  VALUES ('".$page_id."','".$user_id."','Untitled','".$date_formatted."','1','image/event.png','name,matrix_num','Name,Matrix Number','','','')";

    if ($conn->query($sql) === TRUE) {
      echo $page_id;
    } else {
      echo "error";
    }
    $iteration = "1";
  
    $csvpath = getcwd()."/csv/".$page_id."-".$iteration.".csv";
    $signed_file = fopen($csvpath, "w");
    fwrite($signed_file,"nol,nol\r\nPlease use form manager to create your form and refresh the page\r\n");
    fclose($signed_file);

}