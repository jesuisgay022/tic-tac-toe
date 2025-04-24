<?php
header('Content-Type: application/json');

$playerId = $_GET['playerId'];
$gameFile = 'game_state.json';
$response = ['opponentMove' => false];

if (file_exists($gameFile)) {
    $gameState = json_decode(file_get_contents($gameFile), true);
    
    // Find opponent's state
    foreach ($gameState as $id => $state) {
        if ($id !== $playerId) {
            $response['opponentMove'] = true;
            $response['board'] = $state['board'];
            break;
        }
    }
}

echo json_encode($response);
?> 