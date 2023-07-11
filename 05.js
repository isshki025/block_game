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

//1
const blockColumnCount = 5; //列数
const blockRowCount = 3; //行数
const blockWidth = 75; //ブロック一つ分の横幅
const blockHeight = 20; //ブロック一つ分の高さ
const blockPadding = 10; //ブロックとブロックの余白
const blockOffsetTop = 30; //ブロックがキャンバスの上端からどれだけ離れて配置されるか（上部のオフセット）
const blockOffsetLeft = 30; //ブロックがキャンバスの左端からどれだけ離れて配置されるか（左部のオフセット）

//2
const blocks = [];
for (let c = 0; c < blockColumnCount; c++) {
  blocks[c] = [];
  // console.log([c]);
  for (let r = 0; r < blockRowCount; r++) {
    blocks[c][r] = { x: 0, y: 0 };
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

//3
function drawblocks() {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      //4
      const blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
      const blockY = r * (blockHeight + blockPadding) + blockOffsetTop;


      // blocks[c][r].x = 0;
      // blocks[c][r].y = 0;
      //4
      blocks[c][r].x = blockX;
      blocks[c][r].y = blockY;
      ctx.beginPath();
      // ctx.rect(0, 0, blockWidth, blockHeight);
      //4
      ctx.rect(blockX, blockY, blockWidth, blockHeight);
      ctx.fillStyle = "#FFF";
      ctx.fill();
      ctx.closePath();
    }
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //4
  drawblocks();
  drawBall();
  drawBar();


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
