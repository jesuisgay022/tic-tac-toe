let gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameActive: true,
    playerId: null,
    opponentId: null
};

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const newGameBtn = document.getElementById('newGame');

// Initialize game
function initGame() {
    // Generate unique player ID
    gameState.playerId = Math.random().toString(36).substr(2, 9);
    
    // Add click event listeners to cells
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });
    
    // Add click event listener to new game button
    newGameBtn.addEventListener('click', startNewGame);
    
    // Start polling for game updates
    pollGameState();
}

// Handle cell click
function handleCellClick(cell) {
    const index = cell.dataset.index;
    
    if (gameState.board[index] === '' && gameState.gameActive) {
        // Update local game state
        gameState.board[index] = gameState.currentPlayer;
        cell.textContent = gameState.currentPlayer;
        cell.classList.add(gameState.currentPlayer.toLowerCase());
        
        // Send move to server
        sendMove(index);
        
        // Check for win or draw
        checkGameStatus();
    }
}

// Send move to server
function sendMove(index) {
    fetch('update_game.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerId: gameState.playerId,
            move: index,
            board: gameState.board
        })
    });
}

// Poll for game updates
function pollGameState() {
    setInterval(() => {
        fetch('get_game_state.php?playerId=' + gameState.playerId)
            .then(response => response.json())
            .then(data => {
                if (data.opponentMove) {
                    updateBoard(data.board);
                    checkGameStatus();
                }
            });
    }, 1000);
}

// Update board with opponent's move
function updateBoard(board) {
    gameState.board = board;
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        if (board[index] === 'X') {
            cell.classList.add('x');
        } else if (board[index] === 'O') {
            cell.classList.add('o');
        }
    });
}

// Check game status
function checkGameStatus() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState.board[a] && 
            gameState.board[a] === gameState.board[b] && 
            gameState.board[a] === gameState.board[c]) {
            gameState.gameActive = false;
            status.textContent = `Player ${gameState.board[a]} wins!`;
            return;
        }
    }
    
    if (!gameState.board.includes('')) {
        gameState.gameActive = false;
        status.textContent = "It's a draw!";
    }
}

// Start new game
function startNewGame() {
    gameState.board = Array(9).fill('');
    gameState.gameActive = true;
    gameState.currentPlayer = 'X';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    
    status.textContent = "Waiting for opponent...";
    
    // Send new game request to server
    fetch('new_game.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerId: gameState.playerId
        })
    });
}

// Initialize game when page loads
initGame(); 