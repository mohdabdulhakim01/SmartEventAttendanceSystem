<?php
include("connect.php");

if(isset($_POST["option"])){
    $user_id = $_POST["user_id"];
    $page_id = $_POST["page_id"];
    $user_ip_address = "";
    if(isset($_POST["user_ip_addr"]))
      $user_ip_address = $_POST["user_ip_addr"];

    if($_POST["option"]=="read"){
        read_status_attendant($user_id,$page_id);
    }

    if($_POST["option"]=="read_pg_iteration"){
        page_current_iteration($page_id);
    }
    if($_POST["option"]=="update"){
        $current_signed_state = $_POST["current_signed_state"];
       
        update_status_attendant($user_id,$page_id,$current_signed_state,$user_ip_address);
    }
    if($_POST["option"]=="add"){
        add_status_attendant($user_id,$page_id);
    }
}


function page_current_iteration($page_id){
    global $conn;
    
    $iteration = "";
  
    $sql = "SELECT iteration FROM pageform where page_id=".$page_id.";";
    $result = mysqli_query($conn,$sql);
  
    while($r = mysqli_fetch_assoc($result)) {
      $iteration = $r["iteration"];
    }
    echo $iteration;
}
function read_status_attendant($user_id,$page_id){
    global $conn;
    
    $sql = "SELECT * FROM sign_history where user_id=".$user_id." AND page_id=".$page_id.";";
    $result = mysqli_query($conn,$sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows) ;
    
    // if no result. show passcode because no available history of user attending the event
    // if there result, but signed attr  = 0, then show accept button

}

function add_status_attendant($user_id,$page_id){
    global $conn;
    
    $iteration = "";
  
    $sql = "SELECT iteration FROM pageform where page_id=".$page_id.";";
    $result = mysqli_query($conn,$sql);
  
    while($r = mysqli_fetch_assoc($result)) {
      $iteration = $r["iteration"];
    }
    // if exist then skip.
    $query = "SELECT page_id FROM sign_history WHERE page_id='".$page_id."' AND user_id='".$user_id."'";
    $result = mysqli_query($conn,$query); 
    echo mysqli_num_rows($result);
   if(mysqli_num_rows($result) ==0){ // if not exist create
        
        $sql = "INSERT INTO sign_history (page_id, user_id,sign_status,iteration,ip_address)  VALUES ('".$page_id."','".$user_id."','0','".$iteration."','')";

        if ($conn->query($sql) === TRUE) {
        echo $page_id;
        } else {
        echo "error";
        }
   }
 
}
function update_status_attendant($user_id,$page_id,$current_signed_state,$ip_address){
    global $conn;
    $iteration = "";
  
    $sql = "SELECT iteration FROM pageform where page_id=".$page_id.";";
    $result = mysqli_query($conn,$sql);
  
    while($r = mysqli_fetch_assoc($result)) {
      $iteration = $r["iteration"];
    }
    echo $iteration;
    // UPDATE pageform SET pulse_val = '".$raw_pulse."' WHERE page_id=".$_POST["page_id"].";";
    $sql = "UPDATE sign_history set sign_status='".$current_signed_state."',iteration='".$iteration."',ip_address='".$ip_address."' where user_id=".$user_id." AND page_id=".$page_id.";";

    if ($conn->query($sql) === TRUE) {
      echo $page_id;
    } else {
      echo "error";
    }
}

?>