<?php
header("Content-Type: application/json");
require("../database.php");

$user = [];

if (isset($_GET["id"])) {
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $query = $database->prepare("SELECT * FROM users WHERE id = :id");
        $query->execute([
            "id" => htmlspecialchars($_GET["id"])
        ]);
        $user = $query->fetch(PDO::FETCH_ASSOC);
    } else if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
        $query = $database->prepare("DELETE FROM users WHERE id = :id");
        $query->execute([
            "id" => htmlspecialchars($_GET["id"])
        ]);
        $user = $query->fetch();
    } else if ($_SERVER["REQUEST_METHOD"] === "PUT") {
        $bodyData = file_get_contents("php://input");
        $requestData = json_decode($bodyData, true);

        $query = $database->prepare("UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, civilite = :civilite, address = :address, cp = :cp, city = :city, country = :country, birthday = :birthday, phone = :phone, fax = :fax, url = :url
          WHERE id = :id");

        $query->execute([
            "id" => htmlspecialchars($_GET["id"]),
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
        ]);
        $user = $query->fetch();
    } else {
        http_response_code(405);
        echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        exit();
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "L'identifiant est manquant"]);
    exit();
}
?>
<?= json_encode($user) ?>