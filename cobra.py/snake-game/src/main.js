// This file contains the main logic for the snake game.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let gameInterval;

function startGame() {
    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(updateGame, 100);
    startButton.disabled = true; // Disable the button after starting the game
}

function changeDirection(event) {
    switch (event.key) {
        case '8':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case '2':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case '4':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case '6':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        case ' ':
            if (!gameInterval) startGame();
            break;
    }
}

function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over!');
        startButton.disabled = false; // Enable the button after game over
        gameInterval = null; // Reset game interval
        return;
    }
    if (checkFoodCollision()) {
        growSnake();
        placeFood();
    }
    drawGame();
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    return head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function growSnake() {
    snake.push({ ...snake[snake.length - 1] });
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10));
    food.y = Math.floor(Math.random() * (canvas.height / 10));
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

// Start the game when the start button is clicked
startButton.addEventListener('click', startGame);

export { startGame, updateGame, drawGame };