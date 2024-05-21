<?php

$token = "6437559885:AAEjrIXjvaxLcKzaYZWY34VgilD3nxCx-8o;
$chat_id = "-4222850059";

$content = file_get_contents("php://input");
$update = json_decode($content, true);

if (!$update) {
  // Обработка ошибки
  exit;
}

$message = $update['message']['text'];
$reply_message = "Ответ на ваше сообщение: " . $message;

$sendToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$reply_message}");

if ($sendToTelegram) {
    echo "noError";
} else {
  echo "Error";
}
?>