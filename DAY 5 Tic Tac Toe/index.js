let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

let playerXChoice = "";
let playerOChoice = "";
let selectionTurn = "X";

const goatGifs = {
    "Ronaldo": "https://media.giphy.com/media/hryis7A55UXZNCUTNA/giphy.gif",
    "Messi": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWowOHBoOHQwZ3NiemVpZTZndnE1MTd4cHVvbXVxOWZ5ZmljYmgxMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YS5sSs8AJ3Qrj9XuAM/giphy.gif",
    "Mbappe": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXdmNXY2NGs5NTRwODV6NHh5cm41ZXdzcjgxZ2Q1eHAyeWtyYmFlOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kxUhZ0TY46X1Dk48ru/giphy.gif",
    "Zlatan": "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXg1NG10azZrdHZ1OHhiNzJpanowamNtamlpZHVqMXVqdXN3bGN3cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IoKZwSL0TlWzm/giphy.gif"
};

const goatMusic = {
    "Ronaldo": "audio/ronaldo_siu.mp3",
    "Messi":   "audio/messi_ankara.mp3",
    "Mbappe":  "audio/tmnt-1987.mp3",
    "Zlatan":  "audio/final-boss-music.mp3"
};


const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const gameContainer = document.getElementById('game-container');
const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById('turn-indicator');
const resultOverlay = document.getElementById('result-overlay');
const winnerText = document.getElementById('winner-text');
const winGif = document.getElementById('win-gif');
const resetBtn = document.getElementById('reset-btn');
const winMusic = document.getElementById('win-music');
const playerBtns = document.querySelectorAll('.player-btn');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
];

playerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const selected = e.target.getAttribute('data-player');

        if (selectionTurn === "X") {
            playerXChoice = selected;
            selectionTurn = "O";
            modalTitle.innerText = "Player O: Who is better?";
            modalTitle.style.animation = 'none';
            modalTitle.offsetHeight;
            modalTitle.style.animation = 'popIn 0.3s ease';
            
        } else {
            playerOChoice = selected;
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                modalOverlay.classList.add('hidden');
                gameContainer.classList.remove('hidden');
            }, 500);
        }
    });
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    
    if (currentPlayer === "X") {
        clickedCell.innerHTML = '<img src="icon-x.svg" alt="X">';
    } else {
        clickedCell.innerHTML = '<img src="icon-o.svg" alt="O">';
    }
    
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        handleWin();
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        handleDraw();
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.innerText = `Player ${currentPlayer}'s Turn`;
}


function handleWin() {
    gameActive = false;
    winnerText.innerText = `Player ${currentPlayer} Wins!`;
    
    let winnerChoice = currentPlayer === "X" ? playerXChoice : playerOChoice;
    
    winGif.src = goatGifs[winnerChoice];
    
    winMusic.src = goatMusic[winnerChoice] || "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3";
    
    setTimeout(() => {
        resultOverlay.classList.remove('hidden');
        winMusic.play().catch(e => console.log("Audio play failed:", e));
    }, 500);
}

function handleDraw() {
    gameActive = false;
    winnerText.innerText = "It's a Draw!";
    winGif.src = "https://media.giphy.com/media/l2JhtWKX4F9c2F5Ru/giphy.gif";
    
    winMusic.src = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"; // Sad trombone/fail sound
    
    setTimeout(() => {
        resultOverlay.classList.remove('hidden');
        winMusic.play().catch(e => console.log("Audio play failed:", e));
    }, 500);
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    turnIndicator.innerText = "Player X's Turn";
    
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o');
    });

    winMusic.pause();
    winMusic.currentTime = 0;
    resultOverlay.classList.add('hidden');
}