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
      if (blocks[c][r].status === 1) {
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
      if (b.status === 1) {
        if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
          dy = -dy;
          b.status = 0;
          //3
          if (checkAllBlocksBroken()) {
            alert("クリア！！");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}
function checkAllBlocksBroken() {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      if (blocks[c][r].status == 1) { //特定のブロックがまだアクティブ（つまりボールによってまだ破壊されていない）かどうかを判断しています。status が1ならば、そのブロックはまだ破壊されていないということです。
        return false; //アクティブなブロックが見つかった場合、return false; が実行されます。つまり、まだ全てのブロックが破壊されていないという結果が返ります。
      }
    }
  }
  return true; //もしすべてのブロックが調査され、アクティブなブロックが一つも見つからなかった場合、return true; が実行されます。これは全てのブロックが破壊されたという結果を表します。
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlocks();
  drawBall();
  drawBar();
  collisionDetection()

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
  //   dy = -dy;
  // }
  //2
  // if (y + dy < ballRadius) {
  //   dy = -dy;
  // } else if (y + dy > canvas.height - ballRadius) {
  //   alert("GAME OVER");
  //   document.location.reload();
  //   clearInterval(interval);
  // }
  //3
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > barX && x < barX + barWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
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

//1
const interval = setInterval(draw, 10);
