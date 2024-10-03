const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const scoreElement = document.querySelector(".score__result")

const cageSize = 20
const canvasWidth = 320
const canvasHeight = 400
let snake = [{ x: randomPosition().x, y: randomPosition().y }];
let directionSnake = {x: 0, y: 0 };
let food = randomPosition();
let score = 0;

function randomPosition() {
	return {
		x: Math.floor(Math.random() * (canvasWidth / cageSize)) * cageSize,
		y: Math.floor(Math.random() * (canvasHeight / cageSize)) * cageSize,
	}
}

function changeDirection(event) {
	const key = event.key;
	console.log(event)

	switch (key) {
		case "ArrowUp":
			directionSnake = { x: 0, y: -cageSize };
			break;
		case "ArrowDown":
			directionSnake = { x: 0, y: cageSize };
			break;
		case "ArrowLeft":
			directionSnake = { x: -cageSize, y: 0 };
			break;
		case "ArrowRight":
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
	//проверка, съела ли змея еду
	if (newHead.x === food.x && newHead.y === food.y) {
		food = randomPosition()
		score++;
		scoreElement.textContent = score.toString().padStart(2, '0');
	} else {
		snake.pop();
	}
	snake.unshift(newHead);
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

setInterval(gameLoop, 250);

