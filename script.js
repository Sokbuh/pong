const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

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

render();
