<?php
// Retrieve the files metadata from the JSON file
$jsonFile = 'uploads/files.json';
$filesData = json_decode(file_get_contents($jsonFile), true);

header('Content-Type: application/json');
echo json_encode($filesData);
?>