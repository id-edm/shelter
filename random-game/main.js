const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

const cageSize = 20
const canvasWidth = 320
const canvasHeight = 400

const position = {
	x: Math.floor(Math.random() * (canvasWidth / cageSize)) * cageSize,
	y: Math.floor(Math.random() * (canvasHeight / cageSize)) * cageSize,
}

let snake = [{ x: position.x, y: position.y }]

function draw() {
	function drawGrid() {
		ctx.strokeStyle = "grey"
		ctx.lineWidth = 2
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

	ctx.shadowColor = "rgba(0,0,0,0.5)"
	ctx.shadowBlur = 4
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

draw()
