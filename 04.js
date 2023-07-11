const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

//1
const barHeight = 10; //バーの高さ (10px)
const barWidth = 75; //バーの横幅 (75px)
let barX = (canvas.width - barWidth) / 2; //バーの初期位置

//3
let rightPressed = false; //最初は→のキーは押されていないため、false
let leftPressed = false; //最初は←のキーは押されていないため、false

//3
document.addEventListener("keydown", keyDownHandler, false);//左右の矢印キーが押されたとき（keydown イベント）
document.addEventListener("keyup", keyUpHandler, false);//キーが離されたとき（keyup イベント）
//イベントリスナー第一引数はイベントの種類を、第二引数はそのイベントが発生したときに呼び出される関数（ハンドラー）を、第三引数はイベントの伝播をどのように扱うかを示します（ここでは、バブリングフェーズに対するデフォルトの行動を抑制しないことを示しています。詳しくは「イベント伝播」について調べてみてください）。

//3
//それぞれキーが押されたときと離されたときの動作を制御します。これらの関数はイベントオブジェクト e を引数にとり、このオブジェクトの key プロパティを使ってどのキーが押されたかを判断します。それぞれの関数内の if 文と else if 文は、右キーか左キーが押された（または離された）場合の動作を定義しています。
//キーが押された場合、対応する rightPressed または leftPressed 変数が true に設定されます。この結果、それらのキーが押されている間、パドルが右または左に動くようになります。
//逆に、キーが離された場合、対応する rightPressed または leftPressed 変数が false に設定されます。これにより、キーが離されるとパドルの動きが停止します。
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

//2
function drawBar() {
  ctx.beginPath();
  ctx.rect(barX, canvas.height - barHeight, barWidth, barHeight);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBar();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  //4
  // if (rightPressed) { //→が押されたら、barの位置を→に7px動かす
  //   barX += 7;
  // } else if (leftPressed) {　//←が押されたら、barの位置を←に7px動かす
  //   barX -= 7;
  // }
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
