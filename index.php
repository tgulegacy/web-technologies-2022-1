<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document 8</title>
</head>
<body>
<?php
$a = $_GET['a'];
$b = $_GET['b'];
task1($a,$b);

function task1 ($a,$b){
    if($a>=0 & $b>=0) echo $a-$b;
    else
        if($a<0 & $b<0) echo $a*$b;
        else echo $a+$b;
}

task2();
function task2()
{
    $a = mt_rand(0, 15);
    for ($i = $a; $i <= 15; $i++)
        echo $i . ', ';
}


echo task3_calc($a,$b, '*');

function task3_calc($a, $b, $char)
{
    switch ($char) {
        case "-":
            return $a - $b;
        case '+':
            return $a + $b;
        case "/":
            return $a / $b;
        case "*":
            return $a * $b;
        default:
            return "Несуществующий оператор!";
    }
}



//4
echo "<div>". "Текущий ".date("Y"). " год". "</div>";



//5
task5();
function task5()
{
    $i = 0;
    do {
        if ($i == 0) $type_int = " - ноль.";
        elseif ($i % 2 == 0) $type_int = " - четное число.";
        else $type_int = " - нечетное число.";
        echo $i . $type_int. "\n";
        $i++;
    }
    while ($i <= 10);
}


//Задание 6
$city_dict = [
        "Московская область" => ["Москва", "Иваново", "Зеленоград"],
        "Тюменская область" => ["Тюмень", "Тобольск", "Ялуторовск"],
        "Курганская область" => ["Курган", "Шадринск"]
];
task6($city_dict);
function task6($dict)
{
    foreach ($dict as $k => list($v1, $v2, $v3)) {
        echo $k . ":\n" . $v1 . ", " . $v2 . ", " . $v3 . "\n";
    }
}




//7
$dict = [
        'a' => "a",
        'б' => "b",
        'в' => "v",
        'г' => "g",
        'д' => "d",
        'е' => "e",
        'ё' => "yo",
        'ж' => "zh",
        "з" => "z",
        'и' => "i",
        'й' => "y",
        'к' => "k",
        'л' => "l",
        'м' => "m",
        'н' => "n",
        'о' => "o",
        'п' => "p",
        'р' => "r",
        'с' => "s",
        'т' => "t",
        'у' => "u",
        'ф' => "f",
        'х' => "h",
        'ц' => "c",
        'ч' => "ch",
        'ш' => "sh",
        'щ' => "sch",
        'ъ' => "",
        'ы' => "y",
        'ь' => "",
        'э' => "e",
        'ю' => "yu",
        'я' => "ya",

];
transLiter('привет мир', $dict);

function transLiter($str, $dict){
    echo strtr($str, $dict);
}


// 8
$tree = [
    "Уровень 1" => ["Уровень 2", "Уровень 2" => ["Уровень 3", "Уровень 3"],
        "Уровень 3" => ["Уровень 333"]],
    "Уровень 2" => ["Уровень 22", "Уровень 22" => ["Уровень 33", "Уровень 33"]]
];
renderMenu($tree);
function renderMenu($tree)
{
    foreach ($tree as $node1 => $node2) {
        if (is_array($node2)) {
            echo('<li>' . $node1 . '</li>');
            echo('<ul>');
            renderMenu($node2);
            echo('</ul>');
        } else {
            echo('<li>' . $node2 . '</li>');
        }

    }
}
?>
</body>
</html>