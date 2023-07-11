const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
//1
const ballRadius = 10; //円の半径


function drawBall() {
  ctx.beginPath();
  //ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  //2
  // if (y + dy < 0) { //yの座標が0未満になったら (画面の一番上よりも上に行こうとしたら)
  //   dy = -dy;
  // }
  // if (y + dy > canvas.height) {　//yの座標がcanvas(ゲーム画面)の高さの値よりも大きくなったら(ゲーム画面の一番したよりも下に行こうとしたら)
  //   dy = -dy;
  // }

  //3
  // if (y + dy > canvas.height || y + dy < 0) {
  //   dy = -dy;
  // }
  // if (x + dx > canvas.width || x + dx < 0) {
  //   dx = -dx;
  // }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { //半径も考慮して計算する
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}
setInterval(draw, 10);
