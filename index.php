<!doctype html>
<html lang='en'>
<?php
date_default_timezone_set('Asia/Yekaterinburg');

$currYear = date('Y');
$title = 'Тестовый заголовок';
$tag = 'Тестовый тег';
$result = addEnding();

function addEnding() {
    $h = date('H');
    $m = date('i');
    $minutesStr = ' минут';
    $hoursStr = ' час';
    if (($m % 10) === 1) {
        $minutesStr = $minutesStr . 'a';
    } elseif ((($m % 10) >= 2) && (($m % 10) <= 4)) {
        $minutesStr = $minutesStr . 'ы';
    }

    if (($h >= 2 && $h <= 4) || ($h >= 22 && $h <= 24)) {
        $hoursStr = $hoursStr . 'а';
    } elseif (!($h == 1 || $h == 21)) {
    $hoursStr = $hoursStr . 'ов';
    }

    return "$h $hoursStr $m $minutesStr";
}
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $title  ?></title>
</head>
<body>
<h1><?= $tag ?></h1>
<h1> Текущий год: <?= $currYear ?></h1>
<h1> Текущее время: <?= $result ?></h1>
</html>