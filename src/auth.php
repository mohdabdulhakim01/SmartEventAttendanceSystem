<?php
include("connect.php");
$logged = false;

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
if(isset($_POST)=="option"){
    if($_POST["option"]=="login"){
        if(isset($_POST["email"]))
            $email = $_POST["email"];
        if(isset($_POST["password"]))
            $password = $_POST["password"];
        
    
    
        $match_email = "";
        $match_password = "";
        $user_id = "";
        $sql = "SELECT * FROM user WHERE email='".$email."';";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            
                while($row = $result->fetch_assoc()) {
                    global $logged;
                    $match_email = $row["email"];
                    $match_password = $row["password"];
                    if($email==$match_email){
                        if(password_verify($password,$match_password )){
                            $logged = true;
                            $user_id = $row["user_id"];
                                    
                        }
                    }
                }
            } 
        else {
            // email not exist
            }
    
    
    
        $conn->close();
    
        if($logged){
          //  echo $user_id;
          echo '{"status":"ok","id":"'.$user_id.'"}';
        }else{
            echo '{"status":"err"}';
    
        }
    }
    if($_POST["option"]=="register"){
        $email = $_POST["email"];
        $password = $_POST["password"];
        $user_id = rand(10000,99999999);
        $password_salted = password_hash($password, PASSWORD_DEFAULT);
        $sql = "SELECT * FROM user WHERE email='".$email."';";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
             // email exist
             echo "not_ok";
            } 
        else {
            $status_register = false;
            $sql = "INSERT INTO user (user_id, email,password)  VALUES ('".$user_id."','".$email."','".$password_salted."')";

            if ($conn->query($sql) === TRUE) {
              $status_register = true;
            } else {
                $status_register = false;
            }

            $sql_ = "INSERT INTO user_info (id,email,name,ic_number,matrix_num,birthday,phone_num,address,primary_school,lower_secondary,upper_secondary,university,college,polytechnic,current_job,father_name,mother_name,emergency_number,city,state,zip_code,religion,race,department,course,class,club)  VALUES ('".$user_id."','".$email."','','','','','','','','','','','','','','','','','','','','','','','','','')";

            if ($conn->query($sql_) === TRUE) {
                $status_register = true;
            } else {
                $status_register = false;
            }

            if ($status_register==true) {
                echo "ok";
            } else {
               echo "err";
            }
            

        }
    
        $conn->close();
    
       
    }
    

    if($_POST["option"]=="page_info"){
        $page_id = "";
        $user_id = "";
        if(isset($_POST["page_id"]))
            $page_id = $_POST["page_id"];
        if(isset($_POST["user_id"]))
            $user_id = $_POST["user_id"];
            


        //echo $page_id." = ".$user_id;
        
        $sql = "SELECT * FROM pageform WHERE page_id='".$page_id."' AND user_id = '".$user_id."';";
        $result = mysqli_query($conn,$sql); 
        //echo mysqli_num_rows($result);
        if(mysqli_num_rows($result) >0){ // match. auth valid for current page to be edit by owner id
             
            echo "ok";
     
        }else{echo "not_ok";}


        $conn->close();
    }
}



?>