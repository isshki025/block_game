const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // 2d(平面)の描画ができるようになる

let x = canvas.width / 2; // ボールの初期位置を設定している。 (canvasの横幅 ➗ 2 = 中央)
let y = canvas.height - 30; // ボールの初期位置を設定している。 (canvasの下から30px = 下からスタート)
let dx = 2; //x方向（左右）の移動量を設定している。
let dy = -2; //y方向（上下）の移動量を設定している。
const ballRadius = 10; //円の半径

//drawBall() = キャンバス上にボールを描画する処理
function drawBall() {
  ctx.beginPath(); //描画するパスを開始
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //ボールの円弧を描画する　arc()メソッドは中心点(x, y)、半径ballRadius、開始角度0、終了角度Math.PI * 2 (360度を意味し、完全な円を描くために使用される)
  ctx.fillStyle = "#0095DD"; //ボールの色
  ctx.fill(); //塗りつぶし
  ctx.closePath(); //パスを閉じる パスの開始点と終了点をつなげて一つの描画が作り出される
}

// ボールの動きに関する処理
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //キャンバス上のすべてのピクセルをクリアする。これにより前回のフレームで描画されたものがすべて消去される。
  drawBall(); //ボールを描画するために先程定義した drawBall 関数を呼び出す。

  // ボールがキャンバスの右端/左端に到達した時にボールのx方向の動きを反転させる。ボールの半径 ballRadius を考慮に入れて、ボール全体がキャンバスの端に触れた瞬間に反射するようなっている。
  // x + dx > canvas.width - ballRadius ボールの現在のx座標とx方向への移動量を合計したものが、キャンバスの幅（右端）からボールの半径を引いたものよりも大きい場合、つまりボールが右端に達した（もしくは超えようとしている）場合に真となります。ボールの半径を引く理由は、ボールの中心ではなくボールの端がキャンバスの端に触れた瞬間に反射させるためです。
  //x + dx < ballRadius ボールの現在のx座標とx方向への移動量を合計したものが、ボールの半径よりも小さい場合、つまりボールが左端に達した（もしくは超えようとしている）場合に真となります。
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; //ボールのx方向の移動量の符号が反転し、ボールは反射します。
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx; // ボールの新しい位置を計算します。ボールはx方向に dx の量だけ、動きます。
  y += dy; // ボールの新しい位置を計算します。ボールはy方向に dy の量だけ動きます。
}

setInterval(draw, 10); // 0.01秒毎にdrawが実行される
