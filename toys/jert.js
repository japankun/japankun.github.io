var canvas = document.getElementById("c1");
var time   = document.getElementById("time");
var rtat   = document.getElementById("rta");
var msec;
var ctx  = canvas.getContext("2d");
var cur  = new Array(2);
var rta  = 0;
var lock = false;
var mode = 1;

function init () {
	
	ctx.font = "30px Iceland";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.fillText("CLICK TO PLAY", 10, 30);
	
}

function startTest () {
	
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#FF0000";
	ctx.beginPath();
	
	if (mode == 1) {
		ctx.arc(200, 200, 20, 0, Math.PI * 2, false);
	} else {
		ctx.arc(200, 200, 3, 0, Math.PI * 2, false);
	}
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.fill();
	
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(0, 0, 400, 40);
	
	ctx.fillStyle = "rgba(0, 255, 0, 1)";
	ctx.fillText("Playing", 10, 30);
	
}

function flashCircle () {
	
	ctx.fillStyle = "rgba(255, 255, 0, 1)";
	ctx.fill();
	
	msec = setInterval('countup()', 50);
	
	getCurrentTime();
	lock = false;
	
}

function restoreCircle () {
	
	getCurrentTime();
	
	clearInterval(msec);
	rta = 0;
	rtat.innerText = 0;
	
	if (cur[1])
		time.innerHTML = cur[0] - cur[1] + "<br>"+time.innerHTML;
	
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.fill();
}

function countup () {
	rtat.innerText = (parseInt(+new Date()) - cur[0]);
}

function getCurrentTime () {
	cur.unshift(parseInt(+new Date()));
}

function getNextWaitTime () {
	
	startTest();
	
	if (lock)
		return;
	
	restoreCircle();
	lock = true;
	
	msecs = 3000 + Math.floor( Math.random() * 3000 );
	setTimeout('flashCircle()', msecs);
}

function blackedition () {
	
	mode = 2;
	
	canvas.style.background = "url(./bf4.png)";
	
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#FF0000";
	ctx.beginPath();
	ctx.arc(200, 200, 3, 0, Math.PI * 2, false);
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.fill();
	
}
