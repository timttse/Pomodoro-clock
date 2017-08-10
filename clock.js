function Clock(name, millisecs){
	var timer=0;
	var maxTime=millisecs;

	// this.milliseconds=getMilliseconds();
	// this.minutes=getMinutes();
	// this.seconds=getSeconds();

	this.timeString=function(){
		return toTimeString();
	}

	this.name=name;

	this.getMilliseconds=function(){
		return millisecs;
	};

	this.setMilliseconds = function(newMillisecs){
		millisecs=newMillisecs;
		maxTime=millisecs;
	};


	this.getSeconds=function(){
		var seconds = Math.floor((millisecs % (1000 * 60)) / 1000);
		if (seconds<10){seconds='0'+seconds};
		return seconds;
	}

	this.getMinutes=function(){
		var seconds=getSeconds();
		var minutes=Math.floor((millisecs % (1000 * 60 * 60)) / (1000 * 60))
		 if  (minutes>0){
			return minutes+":"+seconds;
		} else {
			return "0:"+seconds;
		}
	};

	this.isRunning=function(){
		return isRunning();
	};

	
	this.reset=function(){
		millisecs=maxTime;
	};

	function getSeconds(){
		var seconds = Math.floor((millisecs % (1000 * 60)) / 1000);
		if (seconds<10){seconds='0'+seconds};
		return seconds;
	}
	
	function isRunning(){
		return Boolean(timer);
	}

	function toTimeString(){
		var days = Math.floor(millisecs / (1000 * 60 * 60 * 24));
		var hours = Math.floor((millisecs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((millisecs % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((millisecs % (1000 * 60)) / 1000);
		if (seconds<10){seconds='0'+seconds};
		// var timeString=days+'d '+hours+'h '+minutes+':'+seconds;
		// console.log(name+": "+days+'d '+hours+'h '+minutes+':'+seconds);
		var timeString='';
		if(days>0){
			timeString=days+'d '+hours+":"+minutes+":"+seconds;
		} else if(hours>0){
			timeString=hours+":"+minutes+":"+seconds;
		} else if  (minutes>0){
			timeString=minutes+":"+seconds;
		} else {
			timeString="0:"+seconds;
		}
		// console.log(timeString);
		return timeString;
	};


	// Render in given html element
	function render(elem){
		if (elem!==undefined){
		// elem.innerHTML=toTimeString();
			elem.html(toTimeString());
		}
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
	    			// console.log(name+" stopped" + Boolean(timer));
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

// var c = new Clock(60000);
// console.log(c.getSeconds());
// console.log(c.isRunning());
// console.log("starting timer");
// c.startTimer('');
// console.log(c.isRunning());
// c.stopTimer();