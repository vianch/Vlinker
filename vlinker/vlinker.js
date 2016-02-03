'use strict';

const  five = require("johnny-five");

class Vlinker {
	constructor() {
		this._led = null;
		this._lcd = null;
		this._isTheLigthOn = false;
		this.startBoard();
		this._isVlinkerReady = false;
	}

	startBoard() {
		five.Board().on("ready", () => { 
			this.initializeComponents();
			this._isVlinkerReady = true;
		});
	}

	initializeComponents() {
		this.startLedRGB();
		this.startLCDController();
	}

	startLedRGB() {
		this._led = new five.Led.RGB({
		 	pins: { red: 3, green: 11, blue: 10 },
		 	isAnode: true
		});
		this.turnLigthOff();
	}

	startLCDController() {
		// Parallel LCD
		this._lcd = new five.LCD({ 
		  pins: [8, 9, 4, 5, 6, 7]
		});
		this.setLCDMessage("VLINKER Ready!")
	}

	turnLigthOn() { 
		this._isTheLigthOn = true;
		this._led.color("#FF0000");
	}

	turnLigthOff() {
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
		setInterval(() => { 
			this.setLigthColor(colorArray[iterator]);
			++iterator
			iterator = (iterator === colorArray.length) ? 0 :  iterator;
		}, 30);
	}
} 


module.exports = new Vlinker();
