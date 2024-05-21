<?php

$msg = $_POST['user_message'];
$token = "6437559885:AAEjrIXjvaxLcKzaYZWY34VgilD3nxCx-8o";
$chat_id = "-4222850059";
$arr = array(
  'Сообщение: ' => $msg,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo "noError";
} else {
  echo "Error";
}
?>