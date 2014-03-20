var timer;
var lastTime;

function initTimer(){
	timer = new Date().getTime();
}

function responseTime(){
	now = new Date().getTime();
	if (lastTime) {
		time = (now-lastTime)/1000;
		lastTime = now;
	} else{
		time = (now-timer)/1000;
		lastTime = now;
	}
	return time;
}