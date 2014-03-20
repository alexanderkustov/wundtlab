var timer;
var lastTime;

function initTimer(){
	timer = new Date().getTime();
}

function responseTime(){
	now = new Date().getTime();
	if (lastTime) {
		responseTime = (now-lastTime)/1000;
		lastTime = now;
	} else{
		responseTime = (now-timer)/1000;
		lastTime = now;
	}
	return responseTime;
}