const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 1
let x = canvas.width / 2; // ボールの初期位置を設定している。 (canvasの横幅 ➗ 2 = 中央)
let y = canvas.height - 30; // ボールの初期位置を設定している。 (canvasの下から30px = 下からスタート)
let dx = 2; //x方向（左右）の移動量を設定している。
let dy = -2; //y方向（上下）の移動量を設定している。

// //2
// function draw() {
//   // 4
//   ctx.clearRect(0, 0, canvas.width, canvas.height); //キャンバス上のすべてのピクセルをクリアする。これにより前回のフレームで描画されたものがすべて消去される。
//   ctx.beginPath();
//   ctx.arc(x, y, 10, 0, Math.PI * 2);
//   ctx.fillStyle = "#FFF";
//   ctx.fill();
//   ctx.closePath();
//   //3
//   x += dx;// ボールの新しい位置を計算する。ボールはx方向に dx の量だけ動く。
//   y += dy;// ボールの新しい位置を計算する。ボールはy方向に dy の量だけ動く。
// }

// //2
// setInterval(draw, 10); // 0.01秒毎にdrawが実行される


function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
}

setInterval(draw, 10);
