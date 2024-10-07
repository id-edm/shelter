const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.querySelector(".score__result");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalResultText = document.querySelector(".modal__result-text");
const modalBtn = document.querySelector(".modal__btn");
const speedElement = document.querySelector(".speed__result");


const cageSize = 20
const canvasWidth = 320
const canvasHeight = 400
let snake = [{ x: 20, y: 20 }];
let directionSnake = {x: 0, y: 0 };
let food = randomPosition();
let score = 0;
let isPaused = false;
let gameInterval = 0;
let gameSpeed = 300;
let speedLevel = 1;

function showModal(type) {
	modalBtn.style.display = "flex";
	switch (type) {
		case 'START':
			modalTitle.textContent = "Press START to start the game.";
			modalResultText.textContent = "";
			modalBtn.textContent = "START";
			modalBtn.onclick = startGame;
			break;
		case 'PAUSE':
			modalTitle.textContent = "PAUSE";
			modalResultText.textContent = "Press spacebar to continue";
			modalBtn.style.display = "none";
			break;
		case 'GAME-OVER':
			modalTitle.textContent = "GAME OVER!";
			modalResultText.textContent = `Your score: ${score}. Speed: ${speedLevel}`;
			modalBtn.textContent = "RESTART";
			modalBtn.onclick = resetGame;
			break;
		case 'VICTORY':
			modalTitle.textContent = "VICTORY!";
			modalResultText.textContent = `Congratulations! Your score: ${score}. Speed: ${speedLevel}`;
			modalBtn.textContent = "PLAY AGAIN";
			modalBtn.onclick = resetGame;
			break;
	}

	modal.classList.add("active");
}

showModal('START');

function hideModal() {
	modal.classList.remove("active");
}

function startGame() {
	hideModal();
	isPaused = false;
	directionSnake = { x: 20, y: 0 };
	clearInterval(gameInterval);
	gameInterval = setInterval(gameLoop, gameSpeed);
	speedElement.textContent = speedLevel.toString().padStart(2, '0');
}

function resetGame() {
	snake = [{ x: randomPosition().x, y: randomPosition().y }];
	directionSnake = { x: 20, y: 0 };
	food = randomPosition();
	score = 0;
	gameSpeed = 300;
	speedLevel = 1;
	scoreElement.textContent = score.toString().padStart(2, '0');
	speedElement.textContent = speedLevel.toString().padStart(2, '0');;
}

function updateGameSpeed() {
	clearInterval(gameInterval);
	gameInterval = setInterval(gameLoop, gameSpeed);
	speedElement.textContent = speedLevel.toString().padStart(2, '0');
}

function pauseGame() {
	showModal('PAUSE');
	isPaused = true;
	clearInterval(gameInterval);
}

function resumeGame() {
	isPaused = false;
	gameInterval = setInterval(gameLoop, gameSpeed);
	modal.classList.remove("active");
}

function gameOver() {
	showModal('GAME-OVER');
	clearInterval(gameInterval);
	gameInterval = null;
}

modalBtn.addEventListener("click", () => {
	startGame();
});

document.addEventListener("keydown", (event) => {
	if (event.code === "Space") { 
		if (isPaused) {
				resumeGame();
			} else {
				pauseGame();
			}
	}
});

function randomPosition() {
	let position;
	let isOnSnake;
	let attempts = 0;

	do {
			position = {
					x: Math.floor(Math.random() * (canvasWidth / cageSize)) * cageSize,
					y: Math.floor(Math.random() * (canvasHeight / cageSize)) * cageSize,
			};
			isOnSnake = snake.some(segment => {
				return segment.x === position.x && segment.y === position.y;
		});
		attempts++;
	} while (isOnSnake);

	return position;
}

function changeDirection(event) {
	const key = event.key
	
	switch (key) {
		case "ArrowUp":
			if (directionSnake.y === 0)
				directionSnake = { x: 0, y: -cageSize };
					break;
		case "ArrowDown":
			if (directionSnake.y === 0)
				directionSnake = { x: 0, y: cageSize };
					break;
		case "ArrowLeft":
			if (directionSnake.x === 0)
				directionSnake = { x: -cageSize, y: 0 };
					break;
		case "ArrowRight":
			if (directionSnake.x === 0)
				directionSnake = { x: cageSize, y: 0 };
					break;
	}
}

document.addEventListener('keydown', changeDirection);

function moveSnake() {
	//получаем новую позицию головы змеи
	const newHead = {
		x: snake[0].x + directionSnake.x,
		y: snake[0].y + directionSnake.y,
	};
	//выход за границы канваса
	if (newHead.x >= canvasWidth) {
		newHead.x = 0;
	} else if (newHead.x < 0) {
		newHead.x = canvasWidth - cageSize;
	}

	if (newHead.y >= canvasHeight) {
		newHead.y = 0;
	} else if (newHead.y < 0) {
		newHead.y = canvasHeight - cageSize;
	};
	//проверка, съела ли змея еду
	if (newHead.x === food.x && newHead.y === food.y) {
		food = randomPosition()
		score++;
		scoreElement.textContent = score.toString().padStart(2, '0');
			if (score % 5 === 0 && gameSpeed > 100) {
				gameSpeed -= 20;
				speedLevel++; 
				updateGameSpeed();
		}
		if (snake.length >= 50) {
			showModal('VICTORY');
			clearInterval(gameInterval);
			return;
		}
	} else {
		snake.pop();
	}
	snake.unshift(newHead);

	for (let i = 1; i < snake.length; i++) {
		if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
			gameOver();    
		}
}
}

function draw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	//отрисовка сетки
	function drawGrid() {
		ctx.strokeStyle = "grey";
		ctx.lineWidth = 2;
		ctx.shadowBlur = 0;
		ctx.beginPath()
		for (let i = 0; i <= canvasWidth; i += cageSize) {
			ctx.moveTo(i, 0)
			ctx.lineTo(i, canvasHeight)
		}
		for (let i = 0; i <= canvasHeight; i += cageSize) {
			ctx.moveTo(0, i)
			ctx.lineTo(canvasWidth, i)
		}
		ctx.stroke()
	}

	drawGrid()

  //тень головы змеи
	ctx.shadowColor = "rgba(0,0,0,0.5)";
	ctx.shadowBlur = 4;
	//отрисовка змеи
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = (i === 0) ? "rgba(168, 168, 18, 0.5)" : "rgba(168, 100, 18, 0.5)";
		ctx.fillRect(snake[i].x, snake[i].y, cageSize, cageSize)
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		if (i === 0) {
			ctx.strokeRect(
				snake[i].x + ctx.lineWidth / 2,
				snake[i].y + ctx.lineWidth / 2,
				cageSize - ctx.lineWidth,
				cageSize - ctx.lineWidth
			)
		}
	}

	//отрисовка еды
	const centerX = food.x + cageSize / 2;
	const centerY = food.y + cageSize / 2;
	const radius = cageSize / 3;

	ctx.beginPath(); 
	ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
	ctx.fillStyle = "red"; 
	ctx.fill();  
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;     
	ctx.stroke();         
}

function gameLoop() {
	moveSnake();
	draw(); 
}

