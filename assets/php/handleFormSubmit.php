<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
if(isset($_POST['c_name'])){
    // $res['sendstatus'] = 1;
    // $res['message'] = 'Form Submission Succesful';
    // echo json_encode($res);

    $name = $_POST['c_name'];
	$email = $_POST['c_email'];
	$message = $_POST['c_message'];
	// $formcontent="From: $name \n Message: $message";
	$recipient = "fliplayer@gmail.com";
	$subject = "Contact from website";
	// $mailheader = "From: $email \r\n";
	if(mail($recipient, $subject, $message, $email))
		echo "done";
	else
		echo "rfailed";
	echo "Thank you";
}

?>