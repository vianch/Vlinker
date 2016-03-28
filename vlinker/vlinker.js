'use strict';

const  five = require("johnny-five");
const temporal = require("temporal");

class Vlinker {
	constructor() {
		this._led = null;
		this._lcd = null;
		this._board = null;
		this._interval = null;
		this._isTheLigthOn = false;
		this._isVlinkerReady = false;
		this._fadeTemporal = null;
		this.startBoard();
	}

	startBoard() {
		this._board = new five.Board();
		this._board.on("ready", () => { 
			this.initializeComponents();
			this._isVlinkerReady = true;
		});
	}

	initializeComponents() {
		this.startLedRGB();
		// this.startLCDController();
		this.startMotionSensor();
	}

	startLedRGB() {
		this._led = new five.Led.RGB({
		 	pins: { red: 10, green: 11, blue: 3 },
		 	isAnode: false,
		 	board: this._board
		});
		this.turnLigthOff();
	}

	startMotionSensor() {
		let motion = new five.Motion(7);

		motion.on("calibrated", () => {
			console.log("Motion sensor calibrated");
		});

		motion.on("motionstart", () => {
			console.log("motionstart");
			this._led.intensity(100);
		});

		motion.on("motionend", () => {
			console.log("motionend");
			this._led.intensity(0);
		});

		motion.on("change", () => {
			console.log("MOTION CHANGE");
		});
	}

	startLCDController() {
		// Parallel LCD
		this._lcd = new five.LCD({ 
		  pins: [8, 9, 4, 5, 6, 7],
		  rows: 2,
		  cols: 16,
		});
	}

	turnLigthOn() { 
		this.clearIntervals();
		this._isTheLigthOn = true;
		this._led.color("#00FF00");
	}

	turnLigthOff() {
		this.clearIntervals();
		this._led.color("#000000");
		this._isTheLigthOn = false;
	}

	setLigthColor(color) {
		this._led.color(color);
	}


	isVlinkerReady() {
		return this._isVlinkerReady;
	}

	setLCDMessage(message) {
		this._lcd.clear();
		this._lcd.print(message);
	}

	rainbowEfect() {
		let iterator = 0,
		colorArray = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#8F00FF"];
		this._interval = setInterval(() => { 
			this.setLigthColor(colorArray[iterator]);
			++iterator
			iterator = (iterator === colorArray.length) ? 0 :  iterator;
		}, 300);
	}

	fadeEffect(loopTime, loopWait) {
		let ledIntensity = 100;
		let isDecreasing =  true;
		this.clearIntervals();

		this._fadeTemporal = temporal.loop(loopTime, () => {
		  if(ledIntensity > 0 && isDecreasing) {
		  	--ledIntensity;
		  } else {	isDecreasing = false; }

		  if(ledIntensity <= 100 && !isDecreasing ) {
		  	++ledIntensity;
		  } else { isDecreasing = true; }

		  this._led.intensity(ledIntensity);
		});
	}

	clearIntervals() {
		clearInterval(this._interval);
		if(this._fadeTemporal !==null ) {
			this._fadeTemporal.stop();
			this._fadeTemporal = null;
		}
	}
} 


module.exports = new Vlinker();
