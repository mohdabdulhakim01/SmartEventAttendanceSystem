<?php
include("connect.php");

$success = false;

if(isset($_POST)=="option"){
    if($_POST["option"]=="read"){
        $sql = "SELECT * FROM user_info where id=".$_POST["user_id"].";";
        $result = mysqli_query($conn,$sql);
        $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }

        echo json_encode($rows);
    }
    if(isset($_POST)=="option"){
        if($_POST["option"]=="update"){
            $user_id =$_POST["user_id"];
            update_profile_data("name",$_POST["name"],$user_id);
            update_profile_data("ic_number",$_POST["ic_number"],$user_id);
            update_profile_data("matrix_num",$_POST["matrix_num"],$user_id);
            update_profile_data("birthday",$_POST["birthday"],$user_id);
            update_profile_data("email",$_POST["email"],$user_id);
            update_profile_data("phone_num",$_POST["phone_num"],$user_id);
            update_profile_data("address",$_POST["home_address"],$user_id);
            update_profile_data("primary_school",$_POST["primary_school"],$user_id);
            update_profile_data("lower_secondary",$_POST["lower_secondary"],$user_id);
            update_profile_data("upper_secondary",$_POST["upper_secondary"],$user_id);
            update_profile_data("university",$_POST["university"],$user_id);
            update_profile_data("college",$_POST["college"],$user_id);
            update_profile_data("polytechnic",$_POST["polytechnic"],$user_id);
            update_profile_data("current_job",$_POST["current_job"],$user_id);
            update_profile_data("father_name",$_POST["father_name"],$user_id);
            update_profile_data("mother_name",$_POST["mother_name"],$user_id);
            update_profile_data("emergency_number",$_POST["emergency_num"],$user_id);
            update_profile_data("city",$_POST["city"],$user_id);
            update_profile_data("state",$_POST["state"],$user_id);
            update_profile_data("zip_code",$_POST["zip_code"],$user_id);
            update_profile_data("religion",$_POST["religion"],$user_id);
            update_profile_data("race",$_POST["race"],$user_id);
            update_profile_data("department",$_POST["department"],$user_id);
            update_profile_data("course",$_POST["course"],$user_id);
            update_profile_data("class",$_POST["class"],$user_id);
            update_profile_data("club",$_POST["club"],$user_id);
            if($success==true){
                echo "ok";
            }
           

        }
       
    }    
}

function update_profile_data($key,$value,$id)
{
    global $conn,$success;
    $sql = "UPDATE user_info SET ".$key."='".$value."' WHERE id=".$id.";";

    if ($conn->query($sql) === TRUE) {
      $success = true;
    } else {
      echo "Error updating record: " . $conn->error;
      $success = false;
    }
}

if($_POST["option"]=="get_identity"){
    $attribute = $_POST["attribute"];
    $data_target = strtoupper($_POST["data"]) ;
    if($data_target!=""){
      $sql = "SELECT ic_number,matrix_num,phone_num FROM user_info WHERE ".$attribute."='".$data_target."';";
      $result = mysqli_query($conn,$sql);
      $rows = array();
      while($r = mysqli_fetch_assoc($result)) {
          $rows[] = $r;
      }
    
      echo json_encode($rows);
    }
  
  }
?>