<?php
header("Content-Type: application/json");
require("../database.php");

$users = [];

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET["search"]) && !empty($_GET["search"])) {
        $query = $database->prepare("SELECT * FROM users WHERE firstname LIKE :search OR lastname LIKE :search OR email LIKE :search");
        $query->execute([
            "search" => "%" . htmlspecialchars($_GET["search"]) . "%"
        ]);
        $users = $query->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $query = $database->query("SELECT * FROM users");
        $users = $query->fetchAll(PDO::FETCH_ASSOC);
    }
} else if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $bodyData = file_get_contents("php://input");
    $requestData = json_decode($bodyData, true);

    $query = $database->prepare("INSERT INTO users (civilite, firstname, lastname, address, cp, city, country, birthday, phone, fax, url, email) VALUES (:civilite, :firstname, :lastname, :address, :cp, :city, :country, :birthday, :phone, :fax, :url, :email)");
    $query->execute(
        [
            ":civilite" => htmlspecialchars($requestData["civilite"]),
            ":firstname" => htmlspecialchars($requestData["firstname"]),
            ":lastname" => htmlspecialchars($requestData["lastname"]),
            ":address" => htmlspecialchars($requestData["address"]),
            ":cp" => htmlspecialchars($requestData["cp"]),
            ":city" => htmlspecialchars($requestData["city"]),
            ":country" => htmlspecialchars($requestData["country"]),
            ":birthday" => htmlspecialchars($requestData["birthday"]),
            ":phone" => htmlspecialchars($requestData["phone"]),
            ":fax" => htmlspecialchars($requestData["fax"]),
            ":url" => htmlspecialchars($requestData["url"]),
            ":email" => htmlspecialchars($requestData["email"])
        ]
    );

    $users = $query->fetch();
} else {
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
    exit();
}

?>
<?= json_encode($users) ?>