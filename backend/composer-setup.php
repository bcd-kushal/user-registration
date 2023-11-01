<?php
require 'vendor/autoload.php'; // Load Composer autoloader
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Connect to PlanetScale using credentials stored in environment variables
$mysqli = mysqli_init();
$mysqli->ssl_set(NULL, NULL, "/etc/ssl/certs/ca-certificates.crt", NULL, NULL);
$mysqli->real_connect($_ENV["DATABASE_HOST"], $_ENV["DATABASE_USERNAME"], $_ENV["DATABASE_PASSWORD"], $_ENV["DATABASE"]);

// Check connection
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

// Query to fetch list of tables
$query = "SHOW TABLES";
$result = $mysqli->query($query);

if ($result) {
    $tables = $result->fetch_all(MYSQLI_NUM);
    if (!empty($tables)) {
        echo "Tables in the database:\n";
        foreach ($tables as $table) {
            echo "- $table[0]\n";
        }
    } else {
        echo "No tables found in the database.\n";
    }
    $result->close();
} else {
    echo "Error fetching tables: " . $mysqli->error;
}

$mysqli->close();
?>
