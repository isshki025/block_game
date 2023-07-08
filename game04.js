const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

let paddleHeight = 10;//パドルの高さを定義します。この場合、パドルの高さは10ピクセルに設定されています。
let paddleWidth = 75;//パドルの幅を定義します。ここでは、パドルの幅は75ピクセルに設定されています。
let paddleX = (canvas.width - paddleWidth) / 2;//パドルのx座標（左上の角）を定義します。これは、キャンバスの中央にパドルを配置するためのものです。パドルの幅をキャンバスの幅から引き、その結果を2で割ることで、パドルがキャンバスの中央に正確に配置されます。

let rightPressed = false;//これらはキーボードの左キーと右キーが押されているかどうかを追跡するためのブール型の変数です。これらはパドルの左右の動きを制御するために使用されます。初期状態ではどちらのキーも押されていないため、両方とも false に設定されています。
let leftPressed = false;

let blocks = [];
const blockRowCount = 1;
const blockColumnCount = 5;
const blockWidth = 75;
const blockHeight = 20;
const blockPadding = 10;
const blockOffsetTop = 30;
const blockOffsetLeft = 30;

for (let c = 0; c < blockColumnCount; c++) {
  blocks[c] = [];
  for (let r = 0; r < blockRowCount; r++) {
    blocks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);//左右の矢印キーが押されたとき（keydown イベント）
document.addEventListener("keyup", keyUpHandler, false);//キーが離されたとき（keyup イベント）
//イベントリスナー第一引数はイベントの種類を、第二引数はそのイベントが発生したときに呼び出される関数（ハンドラー）を、第三引数はイベントの伝播をどのように扱うかを示します（ここでは、バブリングフェーズに対するデフォルトの行動を抑制しないことを示しています。詳しくは「イベント伝播」について調べてみてください）。

//それぞれキーが押されたときと離されたときの動作を制御します。これらの関数はイベントオブジェクト e を引数にとり、このオブジェクトの key プロパティを使ってどのキーが押されたかを判断します。それぞれの関数内の if 文と else if 文は、右キーか左キーが押された（または離された）場合の動作を定義しています。
//キーが押された場合、対応する rightPressed または leftPressed 変数が true に設定されます。この結果、それらのキーが押されている間、パドルが右または左に動くようになります。
//逆に、キーが離された場合、対応する rightPressed または leftPressed 変数が false に設定されます。これにより、キーが離されるとパドルの動きが停止します。
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
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

//drawPaddle 関数は、キャンバス上にパドルを描画します。
function drawPaddle() {
  ctx.beginPath(); //新たな描画パスを開始します。
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); //rect 関数は矩形を描画します。引数はそれぞれ、矩形の左上のx座標、左上のy座標、幅、高さです。ここでは paddleX をx座標に、canvas.height - paddleHeight をy座標に（これによりパドルはキャンバスの底部に配置されます）、paddleWidth を幅に、paddleHeight を高さに設定しています。
  ctx.fillStyle = "#FFF"; //"#FFF"; : 描画する色を設定します。ここでは、パドルの色を白（#FFF）に設定しています。
  ctx.fill(); //現在の描画パスを塗りつぶします。ここでは、先に設定した矩形のパスを塗りつぶします。
  ctx.closePath(); //現在のパスを閉じます。ここでは、矩形の描画を終了しています。
}

function drawBlocks() {
  for (let c = 0; c < blockColumnCount; c++) { //まず、二重のforループでブロックの各列（c）と行（r）を走査します。blockColumnCount と blockRowCount はそれぞれブロックの列数と行数を表します。
    for (let r = 0; r < blockRowCount; r++) {
      if (blocks[c][r].status == 1) { //これは、特定のブロックがアクティブかどうかを判断しています。アクティブなら（つまり status が1なら）、そのブロックを描画します。
        let blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft; //ブロックの位置を更新します
        let blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop; //ブロックの位置を更新します
        blocks[c][r].x = blockX;
        blocks[c][r].y = blockY;
        ctx.beginPath(); //新たな描画パスを開始します。
        ctx.rect(blockX, blockY, blockWidth, blockHeight); //指定した座標に長方形（この場合はブロック）を描画します。
        ctx.fillStyle = "#FFF"; //描画色を設定します
        ctx.fill(); //現在の描画パスを塗りつぶします
        ctx.closePath(); //描画パスを閉じます。
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < blockColumnCount; c++) { //ブロックの各列（c）と行（r）を走査します。blockColumnCount と blockRowCount はそれぞれブロックの列数と行数を表します。
    for (let r = 0; r < blockRowCount; r++) {
      let b = blocks[c][r];
      if (b.status == 1) { //チェックが行われます。これは、特定のブロックがまだアクティブ（つまりボールによってまだ破壊されていない）かどうかを判断しています。アクティブなら（つまり status が1なら）、そのブロックがボールと衝突したかどうかを確認します。
        if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) { //ボールとブロックの衝突を検出します。ここで x と y はボールの現在の座標を表します。もしボールの座標がブロックの領域内にあれば（つまりボールがブロックの左右、上下の境界内にあれば）、衝突が起きたと判断します。
          dy = -dy; //ボールのy方向の動き（dy）が反転します。これによりボールは上方向または下方向へと跳ね返ります（ボールが上に移動していた場合は下に、下に移動していた場合は上に跳ね返ります）。
          b.status = 0; //ブロックのステータスが0に設定されます。これはブロックが破壊され、次回の描画や衝突検出から除外されることを意味します。
        }
      }
    }
  }
}


function collisionDetection() {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      let b = blocks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
          dy = -dy;
          b.status = 0;
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
  drawPaddle();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }
  else if (y + dy < ballRadius) {
    dy = -dy;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

let interval = setInterval(draw, 10);
