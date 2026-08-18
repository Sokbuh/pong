const modeSelection = document.querySelector('#mode-selection');
const singlePlayerButton = document.querySelector('#single-player-button');
const twoPlayerButton = document.querySelector('#two-player-button');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let gameMode = null;

singlePlayerButton.addEventListener('click', () => {
    gameMode = 'single-player';
    modeSelection.hidden = true;
})

twoPlayerButton.addEventListener('click', () => {
    gameMode = 'two-player';
    modeSelection.hidden = true;
})

canvas.width = 800;
canvas.height = 450;

const leftPaddle = {
    x: 0,
    y: 0,
    width: 12,
    height: 80,
    color: '#ffffff'
}

const rightPaddle = {
    x: 0,
    y: 0,
    width: 12,
    height: 80,
    color: '#ffffff'
}

const ball = {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    color: '#ffffff'
}

const keys = {
    KeyW: false,
    KeyS: false,
    ArrowUp: false,
    ArrowDown: false,
}

const paddleSpeed = 300;
const computerPaddleSpeed = 260;
const computerDeadZone = 4;

window.addEventListener('keydown', (evt) => {
    if (evt.code in keys) {
        keys[evt.code] = true;
        evt.preventDefault();
    }
})

window.addEventListener('keyup', (evt) => {
    if (evt.code in keys) {
        keys[evt.code] = false;
        evt.preventDefault();
    }
})

ball.x = canvas.width / 2 - ball.width / 2;
ball.y = canvas.height / 2 - ball.height / 2;
leftPaddle.x = 30;
leftPaddle.y = canvas.height / 2 - leftPaddle.height / 2;
rightPaddle.x = canvas.width - 30 - rightPaddle.width;
rightPaddle.y = canvas.height / 2 - rightPaddle.height / 2;

function render() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#555555';
    for (let y = 10; y < canvas.height; y += 30) {
        ctx.fillRect(canvas.width / 2 - 2, y, 4, 18);
    }

    ctx.fillStyle = leftPaddle.color;
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillStyle = rightPaddle.color;
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    ctx.fillStyle = ball.color;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height );
}

function update(deltaTime) {

    if (gameMode === null) {
        return;
    }

    let leftDirection = 0;
    let rightDirection = 0;

    if (gameMode === 'two-player') {
        if (keys.KeyW) {
            leftDirection -= 1;
        }

        if (keys.KeyS) {
            leftDirection += 1;
        }
    }

    if (gameMode === 'single-player') {
        const paddleCenter = leftPaddle.y + leftPaddle.height / 2;
        const ballCenter = ball.y + ball.height / 2;

        if (ballCenter < (paddleCenter - computerDeadZone)) {
            leftDirection -= 1
        }

        if (ballCenter > (paddleCenter + computerDeadZone)) {
            leftDirection = 1
        }
    }

    if (keys.ArrowUp) {
        rightDirection -= 1;
    }

    if (keys.ArrowDown) {
        rightDirection += 1;
    }

    const leftPaddleSpeed = gameMode === 'single-player' ? computerPaddleSpeed : paddleSpeed;

    leftPaddle.y += leftDirection * leftPaddleSpeed * deltaTime;
    rightPaddle.y += rightDirection * paddleSpeed * deltaTime;

    leftPaddle.y = Math.max(0, Math.min(canvas.height - leftPaddle.height, leftPaddle.y));
    rightPaddle.y = Math.max(0, Math.min(canvas.height - rightPaddle.height, rightPaddle.y));
}

let previousTime = 0;

function gameLoop(currentTime) {
    const deltaTime = previousTime === 0 ? 0 : (currentTime - previousTime) / 1000;

    previousTime = currentTime;

    update(deltaTime);
    render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
