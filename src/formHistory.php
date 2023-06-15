<?php

include("connect.php");
$logged = false;

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST)=="option"){
    $user_id = $_POST["user_id"];
    if($_POST["option"]=="read_history"){
        global $conn;
        $sql = "SELECT * FROM pageform where user_id=".$user_id.";";
        $result = mysqli_query($conn,$sql);
        $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }
        echo json_encode($rows) ;
    }
    if($_POST["option"]=="read_signed_history"){
        global $conn;
        $sql = "SELECT * FROM sign_history where user_id=".$user_id.";";
        $result = mysqli_query($conn,$sql);
        $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
           // echo $r["page_id"]." ";
            $sql_ = "SELECT * FROM pageform where page_id=".$r["page_id"].";";
            $result_ = mysqli_query($conn,$sql_);
            while($x = mysqli_fetch_assoc($result_)) {
                $rows[] = $x;
            }
        }
       echo json_encode($rows) ;
    }
    

}