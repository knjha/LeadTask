
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

const gameBall = {
    x: gameCanvas.width / 2,
    y: gameCanvas.height / 2,
    radius: 20,
    speed: 5,
    dx: 5,
    dy: 5,
};

let bounceCounter = 0;

function drawBallWithBasketballPattern() {
    ctx.beginPath();
    ctx.arc(gameBall.x, gameBall.y, gameBall.radius, 0, Math.PI * 2);

    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    patternCanvas.width = 20;
    patternCanvas.height = 20;

    // Create a basketball pattern
    patternCtx.fillStyle = '#ff6f26'; // Orange
    patternCtx.fillRect(0, 0, 20, 20);

    patternCtx.strokeStyle = 'white';
    patternCtx.lineWidth = 2;
    patternCtx.beginPath();
    patternCtx.arc(10, 10, 7, 0, Math.PI * 2);
    patternCtx.stroke();

    patternCtx.beginPath();
    patternCtx.moveTo(10, 10);
    patternCtx.lineTo(10, 2);
    patternCtx.stroke();

    // Create a black border
    patternCtx.strokeStyle = 'black';
    patternCtx.lineWidth = 1;
    patternCtx.strokeRect(0, 0, 20, 20);

    const ballPattern = ctx.createPattern(patternCanvas, 'repeat');
    ctx.fillStyle = ballPattern;

    ctx.fill();
    ctx.closePath();
}

function moveBallTo(x, y) {
    gameBall.x = x;
    gameBall.y = y;
}

function handleMouseClick(event) {
    const rect = gameCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    moveBallTo(mouseX, mouseY);
    bounceCounter++;
}

function resetGame() {
    bounceCounter = 0;
}

function update() {
    gameBall.x += gameBall.dx;
    gameBall.y += gameBall.dy;

    if (gameBall.x + gameBall.radius > gameCanvas.width || gameBall.x - gameBall.radius < 0) {
        gameBall.dx = -gameBall.dx;
        bounceCounter++;
    }

    if (gameBall.y + gameBall.radius > gameCanvas.height || gameBall.y - gameBall.radius < 0) {
        gameBall.dy = -gameBall.dy;
        bounceCounter++;
    }
}

function draw() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawBallWithBasketballPattern(); // Use the new function

    ctx.font = '20px Arial';
    ctx.fillStyle = 'lightgray'; 
    ctx.fillText('Bounce Count: ' + bounceCounter, 10, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameCanvas.addEventListener('click', handleMouseClick);
resetButton.addEventListener('click', resetGame);

gameLoop();
