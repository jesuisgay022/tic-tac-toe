<?php
header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$playerId = $data['playerId'];

// Clear game state
$gameFile = 'game_state.json';
if (file_exists($gameFile)) {
    unlink($gameFile);
}

echo json_encode(['success' => true]);
?> 