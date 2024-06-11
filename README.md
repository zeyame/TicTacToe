# Tic Tac Toe Game

## Overview

This is a web-based implementation of the classic Tic Tac Toe game. The game features a graphical interface with a 3x3 grid where players can click to place their symbols (X or O). It supports switching between light and dark modes, tracks the score, and offers functionality to start a new game or reset the scores. The game state and score are saved in the local storage to maintain the state across sessions.

## Features

- **Interactive Gameplay**: Players can click on cells to place their symbols.
- **Score Tracking**: The scores for both players (X and O) are tracked and displayed.
- **Light/Dark Mode Toggle**: Users can switch between light and dark themes.
- **Persistent State**: Game state and scores are stored in local storage.
- **Responsive Design**: The game is designed to be responsive and works on different screen sizes.
- **Keyboard Shortcuts**: 
  - Press `Space` to start a new game.
  - Press `Backspace` to reset the scores.
  - Press `d` to switch to dark mode.
  - Press `l` to switch to light mode.

## File Structure

- `index.html`: The main HTML file that contains the structure of the game.
- `styles.css`: The CSS file that contains styles for the game.
- `script.js`: The JavaScript file that contains the logic for the game.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/zeyame/tic-tac-toe.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd tic-tac-toe
    ```
3. **Open `index.html` in a web browser**.

## Usage

### Playing the Game

1. **Start the Game**: Open `index.html` in a web browser. The game starts with a random player (X or O).
2. **Place a Symbol**: Click on any cell in the grid to place your symbol (X or O). Players take turns.
3. **Win or Draw**: The game will automatically check for a win or a draw after each move. A winning line will be displayed if there is a win.
4. **New Game**: Click the "New game" button or press `Space` to start a new game.
5. **Reset Score**: Click the "Reset score" button or press `Backspace` to reset the scores.
6. **Toggle Theme**: Click the "Light Mode"/"Dark Mode" button or press `d`/`l` to switch themes.

### Keyboard Shortcuts

- **New Game**: Press `Space`.
- **Reset Score**: Press `Backspace`.
- **Switch to Dark Mode**: Press `d`.
- **Switch to Light Mode**: Press `l`.

## Code Explanation

### HTML

The `index.html` file sets up the structure of the game including the grid, buttons, and score display. Key elements include:

- `.grid-container`: The 3x3 grid for the game.
- `.color-mode-btn-js`: The button to toggle between light and dark modes.
- `.new-game-btn-js`: The button to start a new game.
- `.reset-score-btn-js`: The button to reset the scores.

### CSS

The `styles.css` file styles the game components. Key styles include:

- `.body-light-mode`: Styles for the light mode.
- `.button-light-mode`: Styles for buttons in light mode.
- `.cell-light-mode`: Styles for grid cells in light mode.
- `.winning-line-light-mode`: Styles for the winning line in light mode.

### JavaScript

The `script.js` file contains the game logic. Key functions include:

- `playGame()`: Sets up the click listeners for the cells.
- `checkWin()`, `checkRowWin()`, `checkColumnWin()`, `checkDiagonalWin()`: Functions to check for a win.
- `checkDraw()`: Function to check for a draw.
- `handleNewGame()`, `restartGame()`: Functions to handle starting a new game.
- `handleResetButton()`, `resetScore()`: Functions to handle resetting the score.
- `handleColorModeButton()`: Function to handle the light/dark mode toggle.
- `darkToLight()`, `lightToDark()`: Functions to switch between dark and light modes.

## Local Storage

The game uses local storage to persist the game state and scores. This allows the game to remember the scores even if the page is refreshed.
