document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 360;
    canvas.height = 640;

    // Load images
    const backgroundImg = new Image();
    backgroundImg.src = "https://www.solarsystemscope.com/images/textures/full/2k_stars.jpg";

    const playerImg = new Image();
    playerImg.src = "https://www.megavoxels.com/wp-content/uploads/2024/07/Pixel-Art-Spaceship-5.webp";

    const enemyImg = new Image();
    enemyImg.src = "https://toppng.com/public/uploads/preview/layer-space-ship-space-ship-png-pixel-art-11562897009dytcvah4cy.png";

    // Background scrolling
    let backgroundY = 0;
    const backgroundSpeed = 0.5; // Slower background speed

    // Player object
    const player = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 80,
        width: 50,
        height: 50
    };

    const bullets = [];
    const enemies = [];
    const bulletSpeed = 7;
    const enemySpeed = 2; // Faster enemy speed
    const enemySpawnRate = 2000;
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;

    document.getElementById("highScore").innerText = highScore;
    let gameOver = false;
    const gameOverElement = document.getElementById("gameOver");

    // Shoot bullet
    function shootBullet() {
        if (!gameOver) {
            bullets.push({
                x: player.x + player.width / 2 - 5,
                y: player.y,
                width: 10,
                height: 20
            });
        }
    }

    // Spawn enemy
    function spawnEnemy() {
        if (!gameOver) {
            const enemy = {
                x: Math.random() * (canvas.width - 50),
                y: -50,
                width: 50,
                height: 50
            };
            enemies.push(enemy);
        }
    }

    // Check collisions
    function checkCollisions() {
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < enemies.length; j++) {
                if (
                    bullets[i].x < enemies[j].x + enemies[j].width &&
                    bullets[i].x + bullets[i].width > enemies[j].x &&
                    bullets[i].y < enemies[j].y + enemies[j].height &&
                    bullets[i].y + bullets[i].height > enemies[j].y
                ) {
                    bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    score += 10;
                    document.getElementById("score").innerText = score;

                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem("highScore", highScore);
                        document.getElementById("highScore").innerText = highScore;
                    }
                    return;
                }
            }
        }
    }

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 360;
    canvas.height = 640;

    // Load images
    const backgroundImg = new Image();
    backgroundImg.src = "https://www.solarsystemscope.com/images/textures/full/2k_stars.jpg";

    const playerImg = new Image();
    playerImg.src = "https://www.megavoxels.com/wp-content/uploads/2024/07/Pixel-Art-Spaceship-5.webp";

    const enemyImg = new Image();
    enemyImg.src = "https://toppng.com/public/uploads/preview/layer-space-ship-space-ship-png-pixel-art-11562897009dytcvah4cy.png";

    // Background scrolling
    let backgroundY = 0;
    const backgroundSpeed = 0.5; // Slower background speed

    // Player object
    const player = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 80,
        width: 50,
        height: 50
    };

    const bullets = [];
    const enemies = [];
    const bulletSpeed = 7;
    const enemySpeed = 2; // Faster enemy speed
    const enemySpawnRate = 2000;
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;

    document.getElementById("highScore").innerText = highScore;
    let gameOver = false;
    const gameOverElement = document.getElementById("gameOver");

    // Shoot bullet
    function shootBullet() {
        if (!gameOver) {
            bullets.push({
                x: player.x + player.width / 2 - 5,
                y: player.y,
                width: 10,
                height: 20
            });
        }
    }

    // Spawn enemy
    function spawnEnemy() {
        if (!gameOver) {
            const enemy = {
                x: Math.random() * (canvas.width - 50),
                y: -50,
                width: 50,
                height: 50
            };
            enemies.push(enemy);
        }
    }

    // Check collisions
    function checkCollisions() {
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < enemies.length; j++) {
                if (
                    bullets[i].x < enemies[j].x + enemies[j].width &&
                    bullets[i].x + bullets[i].width > enemies[j].x &&
                    bullets[i].y < enemies[j].y + enemies[j].height &&
                    bullets[i].y + bullets[i].height > enemies[j].y
                ) {
                    bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    score += 10;
                    document.getElementById("score").innerText = score;

                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem("highScore", highScore);
                        document.getElementById("highScore").innerText = highScore;
                    }
                    return;
                }
            }
        }
    }

    // End game
    function endGame() {
        gameOver = true;
        gameOverElement.style.display = "block";
    }

    // Game loop
    function update() {
        if (gameOver) return;

        // Move background
        backgroundY += backgroundSpeed;
        if (backgroundY >= canvas.height) {
            backgroundY = 0;
        }

        bullets.forEach((bullet, index) => {
            bullet.y -= bulletSpeed;
            if (bullet.y < 0) bullets.splice(index, 1);
        });

        enemies.forEach((enemy, index) => {
            enemy.y += enemySpeed;
            if (enemy.y + enemy.height >= canvas.height) {
                endGame();
            }
        });

        checkCollisions();
        draw();
        requestAnimationFrame(update);
    }

    // Draw game
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw scrolling background
        ctx.drawImage(backgroundImg, 0, backgroundY, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, 0, backgroundY - canvas.height, canvas.width, canvas.height);

        // Draw player
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

        // Draw bullets
        ctx.fillStyle = "red";
        bullets.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height));

        // Draw enemies
        enemies.forEach(enemy => ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height));
    }

    // Slider movement
    const slider = document.getElementById("slider");
    slider.addEventListener("input", () => {
        player.x = parseInt(slider.value);
    });

    // Shoot button event
    const shootButton = document.getElementById("shootButton");
    shootButton.addEventListener("touchstart", shootBullet);
    shootButton.addEventListener("mousedown", shootBullet);

    // Ensure images load before starting the game
    let imagesLoaded = 0;

    function checkImagesLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            update(); // Start the game only when all images are loaded
            setInterval(spawnEnemy, enemySpawnRate);
        }
    }

    backgroundImg.onload = checkImagesLoaded;
    playerImg.onload = checkImagesLoaded;
    enemyImg.onload = checkImagesLoaded;
});
    // End game
    function endGame() {
        gameOver = true;
        gameOverElement.style.display = "block";
    }

    // Game loop
    function update() {
        if (gameOver) return;

        // Move background
        backgroundY += backgroundSpeed;
        if (backgroundY >= canvas.height) {
            backgroundY = 0;
        }

        bullets.forEach((bullet, index) => {
            bullet.y -= bulletSpeed;
            if (bullet.y < 0) bullets.splice(index, 1);
        });

        enemies.forEach((enemy, index) => {
            enemy.y += enemySpeed;
            if (enemy.y + enemy.height >= canvas.height) {
                endGame();
            }
  });

        checkCollisions();
        draw();
        requestAnimationFrame(update);
    }

    // Draw game
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw scrolling background
        ctx.drawImage(backgroundImg, 0, backgroundY, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, 0, backgroundY - canvas.height, canvas.width, canvas.height);

        // Draw player
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
      

        // Draw bullets
        ctx.fillStyle = "red";
        bullets.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height));

        // Draw enemies
        enemies.forEach(enemy => ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height));
    }
        // Slider movement
    const slider = document.getElementById("slider");
    slider.addEventListener("input", () => {
        player.x = parseInt(slider.value);
    });

        // Shoot button event
    const shootButton = document.getElementById("shootButton");
    shootButton.addEventListener("touchstart", shootBullet);
    shootButton.addEventListener("mousedown", shootBullet);

        // Ensure images load before starting the game
    let imagesLoaded = 0;

    function checkImagesLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            update(); // Start the game only when all images are loaded
            setInterval(spawnEnemy, enemySpawnRate);
        }
    }

    backgroundImg.onload = checkImagesLoaded;
    playerImg.onload = checkImagesLoaded;
    enemyImg.onload = checkImagesLoaded;
});
