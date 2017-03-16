function loadImage(file) {
    var image = new Image();
    image.src = file;
    return image;
}

function startLevel() {
    x = 50; y = 500;
    velocityX = 0; velocityY = 0;

    // Adds enemies.
    enemyX = []; enemyY = [];
    enemyVelocityX = []; enemyVelocityY = [];
    for (row = 0; row < gridHeight; row += 1) {
        for (column = 0; column < gridWidth; column += 1) {
            type = level[currentLevel][row][column];
            if (type > 1) {
                enemyX.push(column * blockSize);
                enemyY.push(row * blockSize);
                if (type == 2) {enemyVelocityX.push(2); enemyVelocityY.push(0);}
                if (type == 3) {enemyVelocityX.push(-2); enemyVelocityY.push(0);}
                if (type == 4) {enemyVelocityX.push(0); enemyVelocityY.push(2);}
                if (type == 5) {enemyVelocityX.push(0); enemyVelocityY.push(-2);}
                // etc...
            }
        }
    }
}

function init() {
    KEY_LEFT = 37; KEY_UP = 38; KEY_RIGHT = 39;
    keyPressed = {}
    document.addEventListener("keydown", function(event) {keyPressed[event.keyCode] = true});
    document.addEventListener("keyup", function(event) {keyPressed[event.keyCode] = false});

    blockSize = 32;
    gridWidth = 30; gridHeight = 20;
    canvas = document.createElement("canvas");
    canvas.width = gridWidth * blockSize; canvas.height = gridHeight * blockSize;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);
    gravity = 0.4;
    gameOver = false;
    hasWon = false;

    numberOfLevels = 3;
    level = new Array(numberOfLevels);

    {level[0] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
    ]}

    {level[1] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3],
        [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3],
        [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3],
        [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 4, 4, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
    ]}

    {level[2] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 1, 1, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 1, 1, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 0, 2, 1, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1],
        [1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 4, 0, 1],
        [1, 1, 1, 1, 1, 0, 2, 1, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1]
    ]}

    imageBackground = [loadImage("background 1.png"), loadImage("background 2.png"), loadImage("background 3.png")];
    imagePlayer = loadImage("player.png");
    imageBlock = [loadImage("block 1.png"), loadImage("block 2.png"), loadImage("block 3.png")];
    imageGameOver = loadImage("game over.png");
    imageHasWon = loadImage("has won.png");
    imageEnemy = loadImage("enemy.png");

    currentLevel = 0;
    startLevel();
}

function pointCollision(x, y) {
    if (x < 0 || x > canvas.width - 1) return true;
    if (y < 0 || y > canvas.height - 1) return false;
    return (level[currentLevel][Math.floor(y / blockSize)][Math.floor(x / blockSize)] == 1);
}

function updatePlayerPosition() {
    // Updates velocity.
    if (keyPressed[KEY_RIGHT]) velocityX = 4;
    if (keyPressed[KEY_LEFT]) velocityX = -4;
    if ((pointCollision(x, y + blockSize) || pointCollision(x + blockSize - 1, y + blockSize)) && keyPressed[KEY_UP]) velocityY = -12;
    velocityY += gravity;
    if (velocityY > 30) velocityY = 30;
    velocityX *= 0.75;

    // Updates position and checks collisions.

    // First y.
    y += Math.round(velocityY);
    if (velocityY < 0) {
        if (pointCollision(x, y) || pointCollision(x + blockSize - 1, y)) {
            y = Math.floor(y / blockSize) * blockSize + blockSize;
            velocityY = 0;
        }
    } else {
        if (pointCollision(x, y + blockSize - 1) || pointCollision(x + blockSize - 1, y + blockSize - 1)) {
            y = Math.floor((y + blockSize - 1) / blockSize) * blockSize - blockSize;
            velocityY = 0;
        }
    }

    // Then x.
    x += Math.round(velocityX);
    if (velocityX < 0) {
        if (pointCollision(x, y) || pointCollision(x, y + blockSize - 1)) {
            x = Math.floor(x / blockSize) * blockSize + blockSize;
            velocityX = 0;
        }
    } else {
        if (pointCollision(x + blockSize - 1, y) || pointCollision(x + blockSize - 1, y + blockSize - 1)) {
            x = Math.floor((x + blockSize - 1) / blockSize) * blockSize - blockSize;
            velocityX = 0;
        }
    }
}

function winLose() {
    if (x > canvas.width - 100 && y > 400) {
        if (currentLevel == numberOfLevels - 1) {
            hasWon = true;
        } else {
            currentLevel += 1;
            startLevel();
        }
    }

    if (gameOver) {
        gameOverTimer -= 1;
        if ((keyPressed[KEY_UP] || keyPressed[KEY_RIGHT] || keyPressed[KEY_LEFT]) && gameOverTimer < 0) {
            gameOver = false;
            startLevel();
        }
    } else if (y > canvas.height) {
        gameOver = true;
        gameOverTimer = 40;
    } else {
        for (i = 0; i < enemyX.length; i += 1) {
            if (Math.abs(x - enemyX[i]) < 20 && Math.abs(y - enemyY[i]) < 20) {
                gameOver = true;
                gameOverTimer = 40;
            }
        }
    }
}

function update() {
    if (!gameOver && !hasWon) {
        updatePlayerPosition();
        updateEnemyPosition();
    }

    winLose();

    draw();

    window.requestAnimationFrame(update);
}

function updateEnemyPosition() {
    for (i = 0; i < enemyX.length; i += 1) {
        enemyX[i] += enemyVelocityX[i];
        enemyY[i] += enemyVelocityY[i];
        if (pointCollision(enemyX[i] + blockSize * 0.5, enemyY[i] + blockSize * 0.5)) {
            enemyVelocityX[i] *= -1; enemyVelocityY[i] *= -1;
        }
    }
}

function draw() {
    context.drawImage(imageBackground[currentLevel], 0, 0);

    // Draws enemies.
    for (i = 0; i < enemyX.length; i += 1) {
        context.drawImage(imageEnemy, enemyX[i], enemyY[i]);
    }

    // Draws blocks.
    for (row = 0; row < gridHeight; row += 1) {
        for (column = 0; column < gridWidth; column += 1) {
            if (level[currentLevel][row][column] == 1) {
                context.drawImage(imageBlock[currentLevel], column * blockSize, row * blockSize);
            }
        }
    }

    context.drawImage(imagePlayer, x, y);

    if (gameOver) context.drawImage(imageGameOver, canvas.width * 0.5 - imageGameOver.width * 0.5, canvas.height * 0.5 - imageGameOver.height * 0.5);
    if (hasWon) context.drawImage(imageHasWon, canvas.width * 0.5 - imageGameOver.width * 0.5, canvas.height * 0.5 - imageGameOver.height * 0.5);
}

init();
update();
