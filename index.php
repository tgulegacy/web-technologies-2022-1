<?php
include_once 'model/products.php';
$products = productsAll();
?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div style="display: flex;gap: 1em;flex-wrap: wrap;">
    <? foreach ($products as $product): ?>
        <a href="product.php/?id=<?=$product['id']?>" style="display: flex;flex-direction: column;width: 300px">
            <strong><?=$product['name']?></strong>
            <div>
                <?=$product['description']?>
            </div>
            <div>
                Цена: <?=$product['price']?>
            </div>
            <img src="<?=$product['image']?>" alt="" height="200px" style="object-fit: cover">
        </a>
    <?endforeach;?>
</div>
</body>
</html>
