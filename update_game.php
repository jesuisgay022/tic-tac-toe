<?php
header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$playerId = $data['playerId'];
$move = $data['move'];
$board = $data['board'];

// Save game state to file
$gameFile = 'game_state.json';
$gameState = [];

if (file_exists($gameFile)) {
    $gameState = json_decode(file_get_contents($gameFile), true);
}

$gameState[$playerId] = [
    'board' => $board,
    'lastMove' => $move,
    'timestamp' => time()
];

file_put_contents($gameFile, json_encode($gameState));

echo json_encode(['success' => true]);
?> 