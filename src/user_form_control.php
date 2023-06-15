<?php
include("connect.php");

$logged = false;

$placeholder_image = "event.png";

date_default_timezone_set("Asia/Kuala_Lumpur");
$path = getcwd()."/csv";
 if($_POST["option"]=="read"){
    $sql = "SELECT * FROM pageform where page_id=".$_POST["page_id"].";";
    $result = mysqli_query($conn,$sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }

    echo json_encode($rows);
}
if($_POST["option"]=="upload_logo"){
    
  $old_filename = $_POST["old_picture"];
  $new_picture = $_POST["new_picture"];
  $page_id = $_POST["page_id"];
  
  $file_name = $new_picture;
  $image_data = $_POST["image_data"];
  if($old_filename!="image/".$placeholder_image){
   try{ 
       unlink($old_filename);
        
    }
    catch(Exception $e){echo "errdelete";}
   
   
  }
  
  $file_path = $new_picture;
  $full_file_path =getcwd()."/".$file_path;// getcwd().
  $file_path_direct = $file_path;
  echo $full_file_path;
  $sql = "UPDATE pageform SET form_logo='".$file_path_direct."' WHERE page_id=".$page_id.";";
  if ($conn->query($sql) === TRUE) {
    base64_to_jpeg($image_data,$full_file_path) ;
  } else {
    echo "Error updating record: " . mysqli($conn);
  }

  
}
function base64_to_jpeg($base64_string, $output_file) {
    // open the output file for writing
    $ifp = fopen( $output_file, 'w' ); 
    echo $output_file;
    // split the string on commas
    // $data[ 0 ] == "data:image/png;base64"
    // $data[ 1 ] == <actual base64 string>
    $data = explode( ',', $base64_string );

    // we could add validation here with ensuring count( $data ) > 1
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );

    // clean up the file resource
    fclose( $ifp ); 

}

if($_POST["option"]=="read_user_name_id"){
  $page_id = $_POST["page_id"];
  $matrix_num = strtoupper($_POST["target_matrix_num"]) ;
  if($matrix_num!=""){
    $sql = "SELECT id,name FROM user_info WHERE matrix_num='".$matrix_num."';";
    $result = mysqli_query($conn,$sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
  
    echo json_encode($rows);
  }

}
   function str_contains(string $haystack, string $needle): bool
    {
        return '' === $needle || false !== strpos($haystack, $needle);
    }

if($_POST["option"]=="get_file_iteration"){
    $page_id = $_POST["page_id"];
    $latest_iteration = 1;
     $sql = "SELECT iteration FROM pageform where page_id=".$page_id.";";
      $result = mysqli_query($conn,$sql);
    
      while($r = mysqli_fetch_assoc($result)) {
        $latest_iteration = $r["iteration"];
      }
      $path = getcwd()."/csv";
      $iteration_filename = array();
      $all_iteration_files = array_values(array_diff(scandir($path), array('.', '..')));
      natsort($all_iteration_files);
      //echo var_dump($all_iteration_files);
      for($x = 0;$x<count( $all_iteration_files);$x++){
        
        if (str_contains($all_iteration_files[$x], $page_id)) {
          // date("d/m/Y", filemtime("webdictionary.txt"));
          array_push($iteration_filename,$all_iteration_files[$x]."|".date("l F y", filemtime($path."/".$all_iteration_files[$x])));
      }
      }
      echo implode(',',$iteration_filename);
      
      
    
 
}



if($_POST["option"]=="deletepg"){
  $page_id = $_POST["page_id"];
  $sql = "DELETE from pageform WHERE page_id=".$page_id.";";
      
  if ($conn->query($sql) === TRUE) {
    //echo $raw_pulse." ; ".$fixed_bit;
  } else {
    echo "Error updating record: " . $conn->error;
  }
 // echo "<script>location.href = 'page_maker.html';</script>";
}

if($_POST["option"]=="new_iteration"){
  $page_id = $_POST["page_id"];
  $iteration = "";
  
      $sql = "SELECT iteration FROM pageform where page_id=".$page_id.";";
      $result = mysqli_query($conn,$sql);
    
      while($r = mysqli_fetch_assoc($result)) {
        $iteration = $r["iteration"];
      }

  $iteration = (int) $iteration;
  $iteration++;
  $sql = "UPDATE pageform SET iteration ='".$iteration."' WHERE page_id=".$page_id.";";
      
  if ($conn->query($sql) === TRUE) {
    //echo $raw_pulse." ; ".$fixed_bit;
  } else {
    echo "Error updating record: " . $conn->error;
  }

  echo $iteration;

  $csvpath = getcwd()."/csv/".$page_id."-".$iteration.".csv";
  $signed_file = fopen($csvpath, "w");
  fwrite($signed_file,"nol,nol\r\nPlease use form manager to create your form and refresh the page\r\n");
  fclose($signed_file);
}

if($_POST["option"]=="update_ip_sign_status"){
  $page_id = $_POST["page_id"];
  $single_ip_sign_status = $_POST["single_ip_sign_status"];
  $sql = "UPDATE pageform SET single_ip_sign_status='".$single_ip_sign_status."' WHERE page_id=".$page_id.";";
  if ($conn->query($sql) === TRUE) {
   
  } else {
    echo "Error updating record: " . $conn->error;
  }
}
if($_POST["option"]=="pull_csv"){
  $page_id = $_POST["page_id"];
  $iteration = $_POST["iteration"];
  echo file_get_contents(getcwd()."/csv/".$page_id."-".$iteration.".csv");
}

if($_POST["option"]=="cleandata"){
  $page_id = $_POST["page_id"];
  $sql = "UPDATE pageform SET default_form_element ='name,matrix_num',default_form_name='Name,Matrix Number',form_element='' WHERE page_id=".$page_id.";";
      
  if ($conn->query($sql) === TRUE) {
    //echo $raw_pulse." ; ".$fixed_bit;
  } else {
    echo "Error updating record: " . $conn->error;
  }
}
if($_POST["option"]=="update"){
    $default_form_element = $_POST["default_form_element"];
    
    $default_form_name = $_POST["default_form_name"];
    $form_element =  $_POST["form_element"];
    $page_title = $_POST["page_title"];
    $page_id = $_POST["page_id"];
    $page_date = $_POST["page_date"];
    $csv_header = $_POST["csv_overhead"];
    $iteration = "";
    //echo "dd".$default_form_name;
  
  
      $sql = "SELECT iteration FROM pageform where page_id=".$page_id.";";
      $result = mysqli_query($conn,$sql);
    
      while($r = mysqli_fetch_assoc($result)) {
        $iteration = $r["iteration"];
      }
    

      $sql = "UPDATE pageform SET default_form_element = '".$default_form_element."' WHERE page_id=".$page_id.";";
      
      if ($conn->query($sql) === TRUE) {
        //echo $raw_pulse." ; ".$fixed_bit;
      } else {
        echo "Error updating record: " . $conn->error;
      }
      
      $sql = "UPDATE pageform SET page_title = '".$page_title."',page_date = '".$page_date."' WHERE page_id=".$page_id.";";
      
      if ($conn->query($sql) === TRUE) {
        //echo $raw_pulse." ; ".$fixed_bit;
      } else {
        echo "Error updating record: " . $conn->error;
      } //default_form_name

      $sql = "UPDATE pageform SET default_form_name = '".$default_form_name."' WHERE page_id=".$page_id.";";
      
      if ($conn->query($sql) === TRUE) {
        //echo $raw_pulse." ; ".$fixed_bit;
      } else {
        echo "Error updating record: " . $conn->error;
      }

      $sql = "UPDATE pageform SET form_element = '".$form_element."' WHERE page_id=".$page_id.";";
      
      if ($conn->query($sql) === TRUE) {
        //echo $raw_pulse." ; ".$fixed_bit;
      } else {
        echo "Error updating record: " . $conn->error;
      }
    $csvpath = getcwd()."/csv/".$page_id."-".$iteration.".csv";
    $signed_file = fopen($csvpath, "w");
    fwrite($signed_file,$csv_header."\r\n".$default_form_name."\r\n");
    fclose($signed_file);

  }

  

?>