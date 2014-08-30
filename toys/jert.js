var canvas = document.getElementById("c1");
var time   = document.getElementById("time");
var rtat   = document.getElementById("rta");
var avg    = document.getElementById("avg");

var ctx    = canvas.getContext("2d");
var cur    = new Array(2);
var score  = new Array(5);
var mode   = 1;

var clickBlock = false;
var msecSwitch;

function init () {
	
	// webfontから使ってます
	ctx.font = "30px Iceland";
	ctx.fillStyle = "red";
	ctx.fillText("CLICK TO PLAY", 10, 380);
	
}

function startTest () {
	
	// (1=Standard Mode)
	// (2=BlackEdition Mode)
	if (mode == 1) {
		ctx.arc(200, 200, 20, 0, Math.PI * 2, false);
	} else {
		// BlackEditionはStandardより丸が小さいでしゅ
		ctx.arc(200, 200, 3, 0, Math.PI * 2, false);
	}
	
	// ここまで赤丸描画でしゅ
	ctx.fillStyle = "red";
	ctx.fill();
	
	// ステータスバーでしゅ
	ctx.fillStyle = "black";
	ctx.fillRect(0, 350, 400, 50);
	
	ctx.fillStyle = "limegreen";
	ctx.fillText("Playing", 10, 380);
	
}

function flashCircle () {
	
	// 光る寸前にリセットかけましゅ
	rtat.innerText = 0;
	
	// 光らせましゅ
	ctx.fillStyle = "yellow";
	ctx.fill();
	
	// ここからカウント開始してましゅ
	msecSwitch = setInterval('countup()', 50);
	getCurrentTime();
	
	clickBlock = false;
	
}

function restoreCircle () {
	
	// 計測優先で押下時間を真っ先に処理させましゅ
	getCurrentTime();
	clearInterval(msecSwitch);
	
	if (cur[1]) {
		time.innerHTML = cur[0] - cur[1] + "<br>" + time.innerHTML;
		rtat.innerText = (cur[0] - cur[1]);
		
		score.unshift(cur[0] - cur[1]);
		
	}
	
	avg.innerText = stavg(score);
	ctx.fillStyle = "red";
	
}

function countup () {
	rtat.innerText = (parseInt(+new Date()) - cur[0]);
}

// これでミリ秒単位の時間ゲットできまーしゅｗ
function getCurrentTime () {
	cur.unshift(parseInt(+new Date()));
}

// クリックしたら最初にこれが発動しましゅ
function getNextWaitTime () {
	
	startTest();
	
	// 誤クリックあっても何もしましぇん
	// ペナルティ加算もしましぇん
	if (clickBlock)
		return;
	
	restoreCircle();
	clickBlock = true;
	
	// 3000ミリ秒+0～3000ミリ秒で光らせましゅ
	msecs = 3000 + Math.floor( Math.random() * 3000 );
	setTimeout('flashCircle()', msecs);
	
}

// BlackEditionだドン！
function blackedition () {
	
	mode = 2;
	canvas.style.background = "url(./bf4.png)";
	
	// BlackEditionはStandardより丸が小さいでしゅ
	ctx.arc(200, 200, 3, 0, Math.PI * 2, false);
	ctx.fillStyle = "red";
	ctx.fill();
	
}

function stavg (st) {
	
	var sum = 0;
	
	for (var i = 0, len = st.length; i < len; i++) {
		
		// 要素が未定義だったら抜けましゅ
		if (!st[i])
			break;
		
		sum = sum + Number(st[i]);
		
	}
	
	if (i == 0)
		i = 1;
	
	return Math.round((sum/i)*100)/100;
	
}
