const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 450;

const paddle = {
    positionX: 0,
    positionY: 0,
    width: 12,
    height: 80,
    color: '#ffffff'
}

const ball = {
    positionX: 0,
    positionY: 0,
    width: 16,
    height: 16,
    color: '#ffffff'
}

function render() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#555555';
    for (let y = 10; y < canvas.height; y += 30) {
        ctx.fillRect(canvas.width / 2 - 2, y, 4, 18);
    }

    ctx.fillStyle = paddle.color;
    ctx.fillRect(30, canvas.height / 2 - paddle.height / 2, paddle.width, paddle.height);

    ctx.fillRect(canvas.width - 30 - paddle.width, canvas.height / 2 - paddle.height / 2, paddle.width, paddle.height);
    ctx.fillStyle = ball.color;
    ctx.fillRect(canvas.width / 2 - ball.width / 2,canvas.height / 2 - ball.height / 2, ball.width, ball.height );
}

render();
