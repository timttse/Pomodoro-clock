function Clock(millisecs){
	var timer=0;
	var maxTime=millisecs;

	// this.milliseconds=getMilliseconds();
	// this.minutes=getMinutes();
	// this.seconds=getSeconds();
	this.timeString=toTimeString();
	this.dec=countdown();

	this.getMilliseconds=function(){
		return millisecs;
	}

	this.isRunning=function(){
		return isRunning();
	}

	this.setMilliseconds = function(newMillisecs){
		millisecs=newMillisecs;
		maxTime=millisecs;
	};

	this.reset=function(){
		millisecs=maxTime;
	}

	function isRunning(){
		return Boolean(timer);
	}

	function getMilliseconds(){
		return millisecs;
	}

	function getSeconds(){
		return Math.floor((millisecs % (1000 * 60)) / 1000);
	}

	function getMinutes(){
		return Math.floor((millisecs % (1000 * 60 * 60)) / (1000 * 60));
	}

	function toTimeString(){
		var days = Math.floor(millisecs / (1000 * 60 * 60 * 24));
		var hours = Math.floor((millisecs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((millisecs % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((millisecs % (1000 * 60)) / 1000);
		var timeString=days+'d '+hours+'h '+getMinutes()+':'+getSeconds();
		return timeString;
	};


	// Render in given html element
	function render(elem){
		// elem.innerHTML=toTimeString();
		elem.html(toTimeString());
	}

	function countdown(){
		//console.log(millisecs);
		millisecs-=1000;
	}

	// start timer, pass in html element to render timer in. Optional delay paramter (default 1 second)
	this.startTimer=function(elem,delay){
		elem=(typeof elem !=='undefined') ? elem : $('');
		delay=(typeof delay !=='undefined') ? delay : 1000;
		render(elem)
		if(!(isRunning())){
			timer=setInterval(function(){
	    		if(millisecs<1){
	    			clearInterval(timer);
	    			timer=0;
	    		} else {
		    		countdown();
		    		render(elem)
	    		}
	    	},delay);
			}
	};

	this.stopTimer=function(){
		clearInterval(timer);
		timer=0;
	}

}

// var c = new Clock(10000);
// console.log(c.minutes);
// console.log(c.isRunning());
// console.log("starting timer");
// c.startTimer('');
// console.log(c.isRunning());
// c.stopTimer();