function Clock(millisecs){
	//this.milliseconds=milliseconds;
	var timer;

	function countdown(){
		console.log(millisecs);
		millisecs-=1000;
	}

	this.getMilliseconds=function(){
		return millisecs;
	};

	this.setMilliseconds = function(newMillisecs){
		millisecs=newMillisecs;
	};

	this.getMinutes=function getMinutes(){
		return Math.floor((millisecs % (1000 * 60 * 60)) / (1000 * 60));
	}

	this.getSeconds=function getSeconds(){
		return Math.floor((millisecs % (1000 * 60)) / 1000);
	}

	this.countdown=function(){
		// console.log(millisecs);
		millisecs-=1000;
	};

	this.toTimeString=function(){
		var days = Math.floor(millisecs / (1000 * 60 * 60 * 24));
		var hours = Math.floor((millisecs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((millisecs % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((millisecs % (1000 * 60)) / 1000);
		var timeString=days+'d '+hours+'h '+this.getMinutes()+'m '+this.getSeconds()+'s';
		// console.log(timeString);
		return timeString;
	};

	this.startCountdown=function(){
		timer=setInterval(function(){
    		if(millisecs<0){
    			clearInterval(timer);
    		} else {
	    		countdown();
    		}
    	},1000);
	};

	this.stopTimer=function(){
		clearInterval(timer);
	}
}

// var c = new Clock(10000);
// console.log(c.getMinutes());
// // c.countdown();
// // c.countdown();
// // c.setCountdown();
// c.startCountdown();
// c.stopTimer();
// c.startCountdown();
// // console.log(c.getMilliseconds());