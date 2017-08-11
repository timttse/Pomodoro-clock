var currentTimer='';

function startTimers(timer1,timer2){
	currentTimer=timer1.name;
	$(".currentTimer").text(currentTimer);
	timer1.dec($(".countdown"));
	timer1.startTimer($(".countdown"),1000);

	var t=setInterval(function(){
		if(timer1.getMilliseconds()<=0){
			clearInterval(t);
			timer1.stopTimer();
			timer1.reset();
			$(".countdown").text(timer2.timeString);
			startTimers(timer2,timer1);
		}
	},1000);
}

function stopTimers(timer1,timer2){
	if(timer1.isRunning()){
		timer1.stopTimer();
	}
	if(timer2.isRunning()){
		timer2.stopTimer();
	}
	$(".timerIcon").removeClass("fa-pause").addClass("fa-play");
}

function timersRunning(timers){
	var args = Array.prototype.slice.call(arguments);

	// if at least one timer is running, return true, else false
	return args.some(function(elem){
		return elem.isRunning();
	});
}

function changeTimer(timer,input){
	timer.setMilliseconds(input.val()*60*1000);
	if(currentTimer===timer.name){
		$(".countdown").text(timer.timeString());
		timer.stopTimer();
		$(".timerIcon").removeClass("fa-pause").addClass("fa-play");
	}
}

$(document).ready(function(){
	
	// create session timer
	var sessionInMil=$(".session").val()*60*1000;
	var s=new Clock("Session",sessionInMil);

	// create break timer
	var breakInMil=$(".break").val()*60*1000;
	var b=new Clock("Break",breakInMil);

	// set global current timer
	currentTimer=s.name;

	// Set current timer text
	$(".currentTimer").text(s.name);

	// Set timer text to session timer
	$(".countdown").text(s.timeString());

	// session input value change
	$(".session").change(function(){
		changeTimer(s,$(this))
	});

	//break input value cahnge
	$(".break").change(function(){
		changeTimer(b,$(this))
	});


	// Start/stop button
	$(".pomodoroTimer").click(function(){
		if(!s.isRunning() && !b.isRunning()) {
			if(currentTimer==='' || currentTimer===s.name){
				startTimers(s,b);
			} else if (currentTimer='break'){
				startTimers(b,s);
			}
			$(".timerIcon").removeClass("fa-play").addClass("fa-pause");
		} else {
			stopTimers(s,b);
		}
	});


	// Increment/decrement buttons

	$(".sInc").click(function(){
		var add=+$(".session").val();
		$(".session").val(add+1);
		changeTimer(s,$(".session"));
	});

	$(".sDec").click(function(){
		var dec=+$(".session").val();
		if(dec>1){
			$(".session").val(dec-1);
			changeTimer(s,$(".session"));
		}				
	});


	$(".bInc").click(function(){
		var add=+$(".break").val();
		$(".break").val(add+1);
		changeTimer(b,$(".break"));
	});

	$(".bDec").click(function(){
		var dec=+$(".break").val();
		if(dec>1){
			$(".break").val(dec-1);
			changeTimer(b,$(".break"));
		}				
	});

});