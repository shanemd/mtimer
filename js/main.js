"use strict";

var timer;

window.onload = function() {

    var timerDiv = id('timer');
    timer = new Timer();
    timer.setTime(5000);

    id('playpause-button').onclick = function() { timer.playpause(); }
    id('set-button').onclick = function() {
	timer.stop();
	timer.setTime(id('new-time-input').value * 1000);
    }

    setInterval( function() {
	var timerDiv = id("timer");

	timerDiv.innerHTML = timer.getTimeString();
    }, 20);

}


var id = function(id) {

    return document.getElementById(id);
}



// Timer //

// This is an abstract timer. It supports the following functions:

// NOTE: I might be prematurely optimizing this a bit. Could probably just use a setInterval()

// Set time (time)
// Start/resume
// stop/pause

function Timer() {

    this.time = 0; // ms
    this.startTime = null; // when the timer was last started
    this.running = false;
}


Timer.prototype.setTime = function(ms) {

    this.time = ms;
}


Timer.prototype.getTime = function() {

    if (this.running) {

	return this.time - (new Date() - this.startTime);

    } else {

	return this.time;
    }
}

Timer.prototype.playpause = function() {

    if (this.running) {

	this.stop();

    } else {

	this.start();
    }
}

Timer.prototype.start = function() {

    this.startTime = new Date();
    this.running = true;
}


Timer.prototype.stop = function() {

    this.time = this.getTime();
    this.running = false;
}

Timer.prototype.getTimeString = function() {

    var str;
    var val = this.getTime();
    var ms;
    var s;
    var m;
    var h;

    var sign = '';
    if (val < -999) {
	sign = '-';
    }

    // successively shift out of val;
    val = Math.abs(Math.ceil(val / 1000));

    s = val % 60;
    val = Math.floor(val / 60);

    str = s + 's';

    if ( val > 0 ) {

	m = val % 60;
	val = Math.floor(val / 60);

	str = m + 'm ' + str;
    }

    if ( val > 0 ) {

	h = val;

	str = h + 'h ' + str;
    }

    return sign + '' + str;

}


// End Timer //

function padto2 (num) {

    if (Math.abs(num) < 10) {

	return '0' + num;
    }

    return '' + num;

}
