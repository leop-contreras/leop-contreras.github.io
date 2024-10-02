<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the input from the request
    $input = json_decode(file_get_contents('php://input'), true);
    $displayID = $input['displayID'];
    $value = $input['value'];

    // Read the CSV file
    $csvFile = 'text.csv';
    $data = file($csvFile);
    
    if ($data !== false) {
        $headers = explode(',', trim($data[0]));

        // Determine which value to update based on the displayID
        if ($displayID === 'display1') {
            $headers[0] = $value;
        } elseif ($displayID === 'display2') {
            $headers[1] = $value;
        }

        // Write the updated values back to the CSV file
        $updatedRow = implode(',', $headers) . "\n";
        file_put_contents($csvFile, $updatedRow);

        // Respond with success message
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to read CSV']);
    }
}
?>
