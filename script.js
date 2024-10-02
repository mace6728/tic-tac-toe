const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] !== '' || !gameActive) {
    return;
  }

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusMessage.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (boardState.every(cell => cell !== '')) {
    statusMessage.textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for win
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}

// Restart the game
function restartGame() {
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initialize status message
statusMessage.textContent = `Player ${currentPlayer}'s turn`;
