<?php
$pulse = "";
$email = "";
include("connect.php");


$conn = new mysqli($servername, $username, $password,$dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
/*
name,ic_number,matrix_num,birthday,email,phone_num,address,primary_school,lower_secondary
upper_secondary,university,college,polytechnic,current_job,father_name,mother_name,emergency_number,city,state,zip_code
race,department,course


*/

$default_data = ["name","ic_number","matrix_num","birthday","email","phone_num","address","primary_school","lower_secondary","upper_secondary","university","college","polytechnic","current_job","father_name","mother_name","emergency_number","city","state","zip_code","religion","race","department","course"];
$arranged_data = [];
$answer_obj = [];
$user_id = "";
$page_id = "";
$user_ip_address = "";
if(isset($_POST["page_id"])){
    $page_id = $_POST["page_id"];
}
if(isset($_POST["user_ip_addr"])){
    $user_ip_address = $_POST["user_ip_addr"];
}
if(isset($_POST["user_id"])){
    global $user_id ;
    $user_id = $_POST["user_id"];
    $user_data =  readProfile($user_id);
 
    
}

$postData = array_keys($_POST);
if(isset($_POST["answer"])){
    $answer_list = $_POST["answer"];
   //echo $answer_list."ddd";
    $answer_obj = json_decode($answer_list);
    $json_index = 0;
    foreach($answer_obj->element as $obj){
        if($obj == "custom"){
            array_push( $arranged_data,$answer_obj->answer[$json_index]);
            //echo $answer_obj->answer[$json_index];
           
            $json_index++;
        }else{
            array_push( $arranged_data,str_replace('"' ,'',$user_data[0][$obj]));
            
        }
      
       
    }


}

//echo var_dump($arranged_data);
if(detect_ip_channel_answer($page_id,$user_ip_address,$user_id)==true){
  writeData();
    echo "saved";
}else{

    echo "wrong ip";
}





function writeData(){
    global $arranged_data,$page_id,$conn;
    $iteration = "";
    $sql = "SELECT iteration FROM pageform where page_id=".$page_id.";";
    $result = mysqli_query($conn,$sql);
    while($r = mysqli_fetch_assoc($result)) {$iteration = $r["iteration"];}
    $csvpath = getcwd()."/csv/".$page_id."-".$iteration.".csv";
    $signed_file = fopen($csvpath, "a");

    $tries = 5;
    while ($tries > 0) {
        $locked = flock($signed_file,LOCK_EX | LOCK_NB);
        if (! $locked) {
            usleep(200);
            $tries--;
        } else {
            $tries = 0;
        }
    }
   
   //echo $csvpath.",".$arranged_data.",".$page_id.",".$user_ip_address.",";
    if ($locked) {
        
        //fputcsv($signed_file, $arranged_data,',','"');
        writetoCSV($signed_file,$arranged_data);
        flock($signed_file,LOCK_UN);
    } else {
        echo "try again";
    }

    fclose($signed_file);
   
}
function readProfile($user_id){
    global $conn;
    $sql = "SELECT * FROM user_info where id=".$user_id.";";
        $result = mysqli_query($conn,$sql);
        $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }
    
    return $rows;
}
function writetoCSV($filename,$data){
    $clean_csv_format = array();
    for($x = 0;$x<count($data);$x++){
        array_push($clean_csv_format,str_replace('","' , '"‎,‎"',$data[$x])); // contain invisible char
    }
    $row_csv_data = '"';
    $row_csv_data .= implode('","',$clean_csv_format);
    $row_csv_data .="\"\r\n";
   // echo $row_csv_data;
 
    
    fwrite($filename,$row_csv_data);
  
   // echo $row_csv_data;
}

function detect_ip_channel_answer($page_id,$ip_address,$user_id){
    // find ip address from table signform, if exist then pull page id and user id
    // pull page id single ip sign status, if on then check if userid(signer ) == signed. then notify invalid 
    global $conn;
    $sql = "SELECT * FROM sign_history where ip_address='".$ip_address."' AND page_id='".$page_id."'";
    $result = mysqli_query($conn,$sql);
    $sign_form_data = array();
    while($r = mysqli_fetch_assoc($result)) {
        $sign_form_data[] = $r;
    }

    $sql_ = "SELECT single_ip_sign_status FROM pageform where page_id='".$page_id."';";
    $result = mysqli_query($conn,$sql_);
    $page_id_data = array();
    while($r = mysqli_fetch_assoc($result)) {
        $page_id_data[] = $r;
    }
    $original_user_id_signer = "";
    
    if(count($sign_form_data)>0){
        $original_user_id_signer = $sign_form_data[0]["user_id"];
    }
    
    $page_status = $page_id_data[0]["single_ip_sign_status"];
   // echo "orginal usr id signer : ".$original_user_id_signer."== new user id : ".$user_id."\npage status : ".$page_status;
    if($page_status=="true"){
      if($original_user_id_signer==""){  // if no one exist for the (current ip), then okay to sign
          return true;
      }else{ // if someone exist. check if username is same then ok,if not false
        if($original_user_id_signer!=$user_id){
            return false;
        }else{
            return true;
        }
      }
    }else{
        if($original_user_id_signer!=$user_id){
            return true;
        }else{
            return true;
        }
    }
    

    
    
}
?>
