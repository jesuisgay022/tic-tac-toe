<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'Server is working!',
    'time' => date('Y-m-d H:i:s')
]);
?>