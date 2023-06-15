<?php
$pulse = "";
$email = "";

include("connect.php");



$conn = new mysqli($servername, $username, $password,$dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

    
if(isset($_POST)=="option"){
    if($_POST["option"]=="modify"){
      $raw_pulse = $_POST["pulse"];
     
        $sql = "UPDATE pageform SET pulse_val = '".$raw_pulse."' WHERE page_id=".$_POST["page_id"].";";
        
        if ($conn->query($sql) === TRUE) {
          //echo $raw_pulse." ; ".$fixed_bit;
        } else {
          echo "Error updating record: " . $conn->error;
        }
        }
    }
if($_POST["option"]=="read"){
        $sql = "SELECT * FROM pageform WHERE id=".$_POST["page_id"].";";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            
                while($row = $result->fetch_assoc()) {
                    $pulse = $row["pulse_val"];
                    
                }
            } 
        echo $pulse;
    
}

