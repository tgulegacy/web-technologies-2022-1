<?php
include_once('model/db.php');

function productsAll() : array{
    $sql = "SELECT * FROM products";
    $query = dbQuery($sql);
    return $query->fetchAll();
}

function productById(string $id) {
    $sql = "SELECT * FROM products WHERE id=:id";
    $query = dbQuery($sql, ['id' => $id]);
    return $query->fetchAll();
}
