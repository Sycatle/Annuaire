<?php 

// Connection to database

// 1. Define constants
define("DB_HOST", "localhost");
define("DB_NAME", "annuaire");
define("DB_USER", "root");
define("DB_PASSWORD", "root");

$database = null;

// 2. Connection to database
try {
    $database = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASSWORD);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Erreur : " . $e->getMessage());
}