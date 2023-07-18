const canvas = document.getElementById("gameCanvas"); //HTMLのid名を取得している
const ctx = canvas.getContext("2d");  // 2d(平面)の描画ができるようになる

ctx.beginPath(); //描画するパスを開始
ctx.arc(240, 160, 20, 0, Math.PI * 2, false); //ボールの円弧を描画する　arc()メソッドは中心点(x, y)、半径ballRadius、開始角度0、終了角度Math.PI * 2 (360度を意味し、完全な円を描くために使用される) 描画する方向を表すブール値。trueは反時計回り、falseは時計回りを意味します。
ctx.fillStyle = "#fff"; //ボールの色
ctx.fill(); //塗りつぶし
ctx.closePath(); //パスを閉じる パスの開始点と終了点をつなげて一つの描画が作り出される
