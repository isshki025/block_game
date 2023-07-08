const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

// ブロックの情報
let blocks = []; //これはブロックを格納するための空の配列を作成します。各ブロックは、その状態（壊れているかどうか）と位置（x座標とy座標）を持つオブジェクトとして表されます。
const blockRowCount = 2; //これはブロックの行数を定義します。今回は1行となっています。
const blockColumnCount = 5; //これはブロックの列数を定義します。今回は5列となっています。
const blockWidth = 75; //これらはブロックの幅と高さを定義します。これにより、ブロックがどのくらいのスペースを占めるかを制御します。
const blockHeight = 20;//これらはブロックの幅と高さを定義します。これにより、ブロックがどのくらいのスペースを占めるかを制御します。
const blockPadding = 10; //これはブロック間の間隔（パディング）を定義します。これにより、ブロック同士が密集しないようにします。
const blockOffsetTop = 30; //これらは、ブロックがキャンバスの上端からどれだけ離れて配置されるか（上部のオフセット）、ブロックがキャンバスの左端からどれだけ離れて配置されるか（左部のオフセット）を定義します。これにより、ブロックがキャンバスの端に接触しないようにします。
const blockOffsetLeft = 30; //これらは、ブロックがキャンバスの上端からどれだけ離れて配置されるか（上部のオフセット）、ブロックがキャンバスの左端からどれだけ離れて配置されるか（左部のオフセット）を定義します。これにより、ブロックがキャンバスの端に接触しないようにします。

// ブロックの初期化 それぞれのブロックの座標とステータスを設定しています。
for (let c = 0; c < blockColumnCount; c++) { //それぞれの列に対して操作を行います。ループ変数 c は現在処理している列のインデックスを示しています。
  blocks[c] = []; //これにより、 blocks 配列の c 番目の要素として新たな空の配列が作成されます。これは各列を表す配列です。
  for (let r = 0; r < blockRowCount; r++) { //現在の列に対するそれぞれの行に対して操作を行います。ループ変数 r は現在処理している行のインデックスを示しています。
    blocks[c][r] = { x: 0, y: 0, status: 1 }; //これにより、各ブロックに対して位置 (x と y の座標) と status を設定します。 status はブロックが壊れているかどうかを示す値で、1ならブロックはまだ壊れていない、0ならブロックは壊れている、というように解釈します。初期状態では全てのブロックは壊れていないので status は1に設定されます。 x と y の初期値は0ですが、ブロックを描画する際にこれらの値は適切な座標値に更新されます。
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//ブロックを描画するためのものです。この関数はゲームのフレームごとに呼び出され、各ブロックをキャンバスに描画します。
function drawBlocks() {
  for (let c = 0; c < blockColumnCount; c++) { //最初の for ループは全ての列を処理し、内側の for ループは各列の全ての行を処理します。これにより、すべてのブロックに対する操作が可能になります。
    for (let r = 0; r < blockRowCount; r++) {
      if (blocks[c][r].status == 1) { //この条件文は、ブロックがまだ壊れていない場合（つまり status が1の場合）に、そのブロックを描画します。
        let blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft; // これらの行は、各ブロックのx座標とy座標を計算します。各ブロックの位置は、その列のインデックスと行のインデックス、そしてブロックの幅と高さ、ブロック間の間隔（パディング）、そしてブロックの左と上のオフセットに基づいて計算されます。
        let blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
        blocks[c][r].x = blockX; // これらの行は、各ブロックオブジェクトの x と y の座標を更新します。
        blocks[c][r].y = blockY;
        ctx.beginPath(); //これらの行は、ブロックを描画します。
        ctx.rect(blockX, blockY, blockWidth, blockHeight); //指定された座標に長方形を描画 rect() は Canvas 2D API のメソッドで、長方形を描画するために使用されます。このメソッドは現在のパスに長方形を追加します。描画するには、このメソッドの後に fill() または stroke() メソッドを呼び出す必要があります。ctx.rect(x, y, width, height);x と y は描画する長方形の左上の角の座標です。width と height はそれぞれ長方形の幅と高さを表します。
        ctx.fillStyle = "#0095DD";
        ctx.fill(); //その長方形を塗りつぶします
        ctx.closePath(); //これらの行は、ブロックを描画します。
      }
    }
  }
}

// collisionDetection 関数は、ボールとブロック間の衝突を検出するためのものです
function collisionDetection() {
  for (let c = 0; c < blockColumnCount; c++) { //二重の for ループを使用して、すべてのブロックに対する操作が可能になります。外側のループは列を、内側のループは行を通過します。
    for (let r = 0; r < blockRowCount; r++) {
      let b = blocks[c][r]; //これは現在のブロックを b という変数に代入します。これにより、ブロックのプロパティ（x, y, status）を簡単にアクセスできます。
      if (b.status == 1) { //この条件文は、現在のブロックがまだ壊れていない場合（つまり status が1の場合）に、衝突検出のロジックを実行します。
        if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) { //これはボールが現在のブロックの領域内にあるかどうかをチェックする条件文です。x と y はボールの座標で、 b.x, b.y, b.x + blockWidth, b.y + blockHeight はブロックの左上と右下の角の座標です。ボールの座標がこれらの範囲内にあれば、ボールはブロックに衝突していると判断されます。
          dy = -dy; //ボールがブロックに衝突した場合、この行でボールのy方向の速度（dy）を反転させます。これにより、ボールはブロックから反射して逆方向に移動します。
          b.status = 0; //ボールがブロックに衝突した場合、この行でブロックのステータスを0に設定します。これにより、そのブロックは「壊れた」状態になります。
        }
      }
    }
  }
}
//これらのコードにより、ボールがブロックに衝突すると、ボールは反射し、ブロックは壊れて描画されなくなる、というブロック崩しゲームの基本的な挙動が実現されます。


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlocks();//これらの行はブロックとボールを描画します。これらの関数は前述の通りです。
  drawBall();
  collisionDetection(); //この行は衝突検出の関数を呼び出します。これにより、ボールがブロックに衝突したかどうかが確認され、必要に応じて衝突の結果が処理されます。

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
