document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resultElement = document.getElementById('result');
    const resetButton = document.getElementById('resetButton');
    const playerXPointsElement = document.getElementById('playerXPoints');
    const playerOPointsElement = document.getElementById('playerOPoints');
    const symbolSelect = document.getElementById('symbolSelect');

    let currentPlayer = 'X';
    let gameActive = true;
    let playerXPoints = 0;
    let playerOPoints = 0;

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (cell.textContent !== '' || !gameActive) {
            return;
        }

        cell.textContent = currentPlayer;

        if (checkForWinner()) {
            resultElement.textContent = `Player ${currentPlayer} wins!`;
            highlightWinningCombination();
            updatePoints();
            gameActive = false;
        } else if (checkForTie()) {
            resultElement.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerTurn();
        }
    }

    function checkForWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => cells[index].textContent === currentPlayer)
        );
    }

    function checkForTie() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function highlightWinningCombination() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                cells[a].textContent === currentPlayer &&
                cells[b].textContent === currentPlayer &&
                cells[c].textContent === currentPlayer
            ) {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
                break;
            }
        }
    }

    function updatePoints() {
        if (currentPlayer === 'X') {
            playerXPoints++;
            playerXPointsElement.textContent = playerXPoints;
        } else {
            playerOPoints++;
            playerOPointsElement.textContent = playerOPoints;
        }
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });

        resultElement.textContent = '';
        currentPlayer = symbolSelect.value;
        gameActive = true;

        updatePlayerTurn();
    }

    function updatePlayerTurn() {
        resultElement.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    // Initial setup
    symbolSelect.addEventListener('change', resetGame);
    resetGame();
});
