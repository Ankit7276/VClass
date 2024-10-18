<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define the target directory
$targetDir = "uploads/";
$jsonFile = $targetDir . 'files.json';

// Check if the JSON file exists, if not create it
if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, json_encode([])); // Create an empty array
}

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $type = $_POST['type'];
    $creator = $_POST['creator'];
    $file = $_FILES['file'];

    $fileName = basename($file["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    // Save the file on the server
    if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
        // Store file metadata in the JSON file
        $fileData = [
            "title" => $title,
            "type" => $type,
            "creator" => $creator,
            "fileName" => $fileName,
            "filePath" => $targetFilePath,
            "fileType" => $fileType
        ];

        $existingData = json_decode(file_get_contents($jsonFile), true);
        $existingData[] = $fileData;
        file_put_contents($jsonFile, json_encode($existingData));

        echo "File uploaded successfully.";
    } else {
        echo "Error uploading file.";
    }
}
?>
