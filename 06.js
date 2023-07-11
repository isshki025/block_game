const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

const barHeight = 10;
const barWidth = 75;
let barX = (canvas.width - barWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const blockColumnCount = 5;
const blockRowCount = 3;
const blockWidth = 75;
const blockHeight = 20;
const blockPadding = 10;
const blockOffsetTop = 30;
const blockOffsetLeft = 30;

const blocks = [];
for (let c = 0; c < blockColumnCount; c++) {
  blocks[c] = [];
  for (let r = 0; r < blockRowCount; r++) {
    // blocks[c][r] = { x: 0, y: 0 };
    //4
    blocks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function drawBar() {
  ctx.beginPath();
  ctx.rect(barX, canvas.height - barHeight, barWidth, barHeight);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function drawBlocks() {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      //5
      if (blocks[c][r].status === 1) {
        //4
        const blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
        const blockY = r * (blockHeight + blockPadding) + blockOffsetTop;

        blocks[c][r].x = blockX;
        blocks[c][r].y = blockY;
        ctx.beginPath();
        ctx.rect(blockX, blockY, blockWidth, blockHeight);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//1
function collisionDetection() {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      const b = blocks[c][r];
      //5
      if (b.status === 1) {
        //2
        //ボールの x 座標がブロックの x 座標より大きい、ボールの x 座標がブロックの x 座標とその幅の和より小さい、ボールの y 座標がブロックの y 座標より大きい、ボールの y 座標がブロックの y 座標とその高さの和より小さい　つまり、ボールがブロックの中に入っていれば
        if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
          dy = -dy;
          //5
          b.status = 0;
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlocks();
  drawBall();
  drawBar();
  //3
  collisionDetection()

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  if (rightPressed) {
    barX += 5;
    if (barX + barWidth > canvas.width) {
      barX = canvas.width - barWidth;
    }
  } else if (leftPressed) {
    barX -= 5;
    if (barX < 0) {
      barX = 0;
    }
  }
  x += dx;
  y += dy;
}

setInterval(draw, 10);
