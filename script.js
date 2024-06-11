let playerTurn;     // stores the current player's turn
let gameWon = false;        // keeps track of whether the game has been won or not

// retrieve the current score from the local storage or assign a new score of 0-0
let score = JSON.parse(localStorage.getItem('score')) || {
    x: 0,
    o: 0
};

// HashMap for storing the current state of the game
let cells = new Map([
    ['cell-1', ''],
    ['cell-2', ''],
    ['cell-3', ''],
    ['cell-4', ''],
    ['cell-5', ''],
    ['cell-6', ''],
    ['cell-7', ''],
    ['cell-8', ''],
    ['cell-9', ''],
]);

displayScore();
playGame();  
startingPlayer();  
handleNewGame();    
handleResetButton();       


function startingPlayer() {
    const currentDisplayMsg = document.querySelector('.current-display-msg-js');
    const randomVal = Math.random();
    playerTurn = randomVal < 0.5 ? 'x' : 'o';
    currentDisplayMsg.innerHTML = `Turn: ${playerTurn}`;
}

function nextPlayer() {
    // switches to a new turn when called
    playerTurn = playerTurn === 'x' ? 'o' : 'x';

    // displays the current player's turn
    const currentDisplayMsg = document.querySelector('.current-display-msg-js');
    currentDisplayMsg.innerHTML = `Turn: ${playerTurn}`;
}

// method handles clicks for all cells in the grid
function playGame() {
    for (let [cell] of cells) {
        const cellClicked = document.querySelector(`.${cell}`);     // retrieving the cell element as an object

        // adding a click listener to all cells
        cellClicked.addEventListener('click', () => {
            let currentValue = cells.get(cell);       // getting the current value associated with the cell

            // if game has not been won and cell has not been clicked yet we play the turn
            if (!gameWon && currentValue === "") {
                // handling the x turn
                if (playerTurn === 'x') {
                    cells.set(cell, 'x');
                    cellClicked.innerHTML = `<img class="x-symbol x-symbol-js" src="images/x.png" alt="X symbol">`;
                    checkWin();

                    // if game still has not been won we check if it was a draw                    
                    if (!gameWon) {
                        const draw = checkDraw();
                        if (!draw) {
                            nextPlayer();        // if it is also not a draw then we continue playing
                        }
                    }

                    // if the game was won then we update the scores and display them
                    else {
                        score['x']++;
                        localStorage.setItem('score', JSON.stringify(score));
                        displayScore();
                    }
                }

                // we do the same thing for the o turn
                else {
                    cells.set(cell, 'o');
                    cellClicked.innerHTML = `<img class="o-symbol o-symbol-js" src="images/o.png" alt="O symbol">`;
                    checkWin();
                    
                    if (!gameWon) {
                        const draw = checkDraw();
                        if (!draw) {
                            nextPlayer();
                        }
                    }
                    else {
                        score['o']++;
                        localStorage.setItem('score', JSON.stringify(score));
                        displayScore();
                    }
                }
            }
            // nothing happens if game has been won or cell has already been clicked
        });
    }
}


// checks if all cells have been played
function checkDraw() {
    for (let value of cells.values()) {
        if (value === "") {
            return false;
        }
    }
    // if all cells have been played and there was no win (this function will get called only after checking for a win)
    const currentDisplayMsg = document.querySelector('.current-display-msg-js');
    currentDisplayMsg.innerHTML = 'Its a draw.';
    return true;
}


function checkWin() {
    // checking if any win was achieved
    const rowWin = checkRowWin();
    const columnWin = checkColumnWin();
    const diagonalWin = checkDiagonalWin();
    
    // retrieving the element which will display the winning message
    const currentDisplayMsg = document.querySelector('.current-display-msg-js');

    // retrieving the element which will draw the line through the grid
    const winningLineElement = document.querySelector('.winning-line-js');

    if (rowWin) {
        // adding a class for the winning line
        rowWin[1] === 'row-1' ? winningLineElement.classList.add('row-1-win') : rowWin[1] === 'row-2' ? winningLineElement.classList.add('row-2-win') : winningLineElement.classList.add('row-3-win');
        
        currentDisplayMsg.innerHTML = `${rowWin[0].toUpperCase()} won!`;
        gameWon = true;
    }

    else if (columnWin) {
        // adding a class for the winning line 
        columnWin[1] === 'column-1' ? winningLineElement.classList.add('column-1-win') : columnWin[1] === 'column-2' ? winningLineElement.classList.add('column-2-win') : winningLineElement.classList.add('column-3-win');

        currentDisplayMsg.innerHTML = `${columnWin[0].toUpperCase()} won!`;
        gameWon = true;
    }
    
    else if (diagonalWin) {
        // adding a class for the winning line 
        diagonalWin[1] === 'diagonal-1' ? winningLineElement.classList.add('diagonal-1-win') : winningLineElement.classList.add('diagonal-2-win');

        currentDisplayMsg.innerHTML = `${diagonalWin[0].toUpperCase()} won!`;
        gameWon = true;
    }
}


function checkRowWin() {
    let win = [];   // array will store the winner and which row was the win achieved

    // retrieving all three rows of the grid
    const row1 = [cells.get('cell-1'), cells.get('cell-2'), cells.get('cell-3')];
    const row2 = [cells.get('cell-4'), cells.get('cell-5'), cells.get('cell-6')];
    const row3 = [cells.get('cell-7'), cells.get('cell-8'), cells.get('cell-9')];

    // checking if the grid cells on row 1 are not empty and equal each other
    if (row1[0] && row1[0] === row1[1] && row1[1] === row1[2]) {
        const winner = row1[0];
        win = [winner, 'row-1'];
        return win;
    }

    // checking if the grid cells on row 2 are not empty and equal each other
    else if (row2[0] && row2[0] === row2[1] && row2[1] === row2[2]) {
        const winner = row2[0];
        win = [winner, 'row-2'];
        return win;
    }

    // checking if the grid cells on row 3 are not empty and equal each other
    else if (row3[0] && row3[0] === row3[1] && row3[1] === row3[2]) {
        const winner = row3[0];
        win = [winner, 'row-3'];
        return win;
    }

}

function checkColumnWin() {
    let win = [];       // array will store the winner and which row was the win achieved

    // retrieving all three columns of the grid
    const column1 = [cells.get('cell-1'), cells.get('cell-4'), cells.get('cell-7')];
    const column2 = [cells.get('cell-2'), cells.get('cell-5'), cells.get('cell-8')];
    const column3 = [cells.get('cell-3'), cells.get('cell-6'), cells.get('cell-9')];

    // checking if the grid cells on column 1 are not empty and equal each other
    if (column1[0] && column1[0] === column1[1] && column1[1] === column1[2]) {
        const winner = column1[0];
        win = [winner, 'column-1'];
        return win;
    }

    // checking if the grid cells on column 2 are not empty and equal each other
    else if (column2[0] && column2[0] === column2[1] && column2[1] === column2[2]) {
        const winner = column2[0];
        win = [winner, 'column-2'];
        return win;
    }

    // checking if the grid cells on column 3 are not empty and equal each other
    else if (column3[0] && column3[0] === column3[1] && column3[1] === column3[2]) {
        const winner = column3[0];
        win = [winner, 'row-3'];
        return win;
    }

}

function checkDiagonalWin() {
    let win = [];       // array will store the winner and which row was the win achieved
    
    // retrieving the two diagonals of the grid
    const diagonal1 = [cells.get('cell-1'), cells.get('cell-5'), cells.get('cell-9')];
    const diagonal2 = [cells.get('cell-3'), cells.get('cell-5'), cells.get('cell-7')];

    // checking if the grid cells on diagonal 1 are not empty and equal each other
    if (diagonal1[0] && diagonal1[0] === diagonal1[1] && diagonal1[1] === diagonal1[2]) {
        const winner = diagonal1[0];
        win = [winner, 'diagonal-1'];
        return win;
    }

    // checking if the grid cells on diagonal 2 are not empty and equal each other
    else if (diagonal2[0] && diagonal2[0] === diagonal2[1] && diagonal2[1] === diagonal2[2]) {
        const winner = diagonal2[0];
        win = [winner, 'diagonal-2'];
        return win;
    }
}


function displayScore() {
    const xScoreElement = document.querySelector('.x-score-js');
    const oScoreElement = document.querySelector('.o-score-js');

    xScoreElement.innerHTML = `X: ${score['x']}`;
    oScoreElement.innerHTML = `O: ${score['o']}`;
}


function handleNewGame() {
    const newGameButtonElement = document.querySelector('.new-game-btn-js');
    const lastDisplayMsg = document.querySelector('.current-display-msg-js');

    // adding an event listener to the new game button
    newGameButtonElement.addEventListener('click', () => {
        restartGame();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            restartGame();
        }
    })
}

function restartGame() { 
        // restarting the turns 
        startingPlayer();

        // resetting the game state
        gameWon = false;    
        for (let [key] of cells) {
            cells.set(key, '');
        }
        for (let key of cells.keys()) {
            const cellElement = document.querySelector(`.${key}`);
            cellElement.innerHTML = '';
        }

        // removing the winning line from last game
        removeWinningLine();
}


function handleResetButton() {
    const resetScoreElement = document.querySelector('.reset-score-btn-js');
    resetScoreElement.addEventListener('click', () => {
        resetScore();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            resetScore();
        }
    })
}

function resetScore() {
        // we reset the score and override the score element in local storage
        score['x'] = 0;
        score['o'] = 0;
        localStorage.setItem('score', JSON.stringify(score));
        displayScore();
}


// function removes the last winning line drawn
function removeWinningLine() {
    const winningLineElement = document.querySelector('.winning-line-js');
    const elementClasses = winningLineElement.classList;
    const lastWinningLine = elementClasses.item(elementClasses.length-1);
    elementClasses.remove(lastWinningLine);
}