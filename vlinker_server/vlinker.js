'use strict';

const  five = require("johnny-five");

class Vlinker {
	constructor() {
		this._led = null;
		this._button = null;
		this._isTheLigthOn = false;
		this.startBoard();
		this._isVlinkerReady = false;
	}

	startBoard() {
		five.Board().on("ready", () => { 
			this.initializeComponents();
			this.initializeResetButton();
		});
	}

	initializeComponents() {
		this._led = new five.Led.RGB({
		 	pins: { red: 9, green: 10, blue: 11 },
		 	isAnode: true
		});
		this.turnLigthOff();

		this._button = new five.Button(2);

		this._isVlinkerReady = true;
	}

	turnLigthOn() { 
		this._isTheLigthOn = true;
		this._led.color("#FF0000");
	}

	turnLigthOff() {
		this._led.color("#000000");
		this._isTheLigthOn = false;
	}

	initializeResetButton() {
		let _this = this;
		
		this._button .on("down", function() {
			if(_this._isTheLigthOn) {
		    	_this.turnLigthOff();
			} else {
				_this.turnLigthOn();
			}
		});
	}

	setLigthColor(color) {
		this._led.color(color);
	}

	isVlinkerReady() {
		return this._isVlinkerReady;
	}
} 


module.exports = new Vlinker();
