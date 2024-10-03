const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

const cageSize = 20
const canvasWidth = 320
const canvasHeight = 400

const position = {
	x: Math.floor(Math.random() * (canvasWidth / cageSize)) * cageSize,
	y: Math.floor(Math.random() * (canvasHeight / cageSize)) * cageSize,
}

let snake = [{ x: position.x, y: position.y }];
let directionSnake = {x: 0, y: 0 };

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
	// получаем новую позицию головы змеи
	const newHead = {
			x: snake[0].x + directionSnake.x,
			y: snake[0].y + directionSnake.y,
	};

	snake.unshift(newHead);
	snake.pop();
}

function draw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Очищаем канвас
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
		ctx.fillStyle = "rgba(168, 168, 18, 0.5)"
		ctx.fillRect(snake[i].x, snake[i].y, cageSize, cageSize)
		ctx.strokeStyle = "black"
		ctx.lineWidth = 2
		ctx.strokeRect(
			snake[i].x + ctx.lineWidth / 2,
			snake[i].y + ctx.lineWidth / 2,
			cageSize - ctx.lineWidth,
			cageSize - ctx.lineWidth
		)
	}
}

function gameLoop() {
	moveSnake(); // Перемещаем змею
	draw(); // Отрисовываем игровую область
}

// Запуск игрового цикла каждые 100 мс
setInterval(gameLoop, 500);

