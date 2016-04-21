<?php
require_once('class.phpmailer.php');

function base64_to_jpeg($base64_string, $output_file) {
    $ifp = fopen($output_file, "wb"); 

    $data = explode(',', $base64_string);

    fwrite($ifp, base64_decode($data[1])); 
    fclose($ifp); 

    return $output_file; 
}

$data = $_POST['dataString'];

$data = json_decode($data,true);


$to = $data['email'];
$img = $data['image'];
$title = "Trajectory Drawing Image";
$image = base64_to_jpeg( $img, 'tmp.jpg' );


$email = new PHPMailer();
$email->From      = 'yatohime@yatohime.com';
$email->FromName  = 'Trajectory Drawing';
$email->Subject   = 'Trajectory Drawing';
$email->Body      = 'Here your image';
$email->AddAddress( $to );
$email->isHTML(true);   
$email->AddAttachment( $image , 'd1.png' );

return $email->Send();

echo "Hello";

?>