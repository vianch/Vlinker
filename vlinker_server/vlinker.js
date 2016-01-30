var five = require("johnny-five");

function Vlinker() {
	this._led = null;
	this._button = null;
	this._isTheLigthOn = false;
	this.startBoard();
	this._isVlinkerReady = false;
}	

Vlinker.prototype.startBoard = function() {
	five.Board().on("ready", () => { 
		this.initializeComponents();
		this.initializeResetButton();
	});
};

Vlinker.prototype.initializeComponents = function(argument){
	this._led = new five.Led.RGB({
	 	pins: { red: 9, green: 10, blue: 11 },
	 	isAnode: true
	});
	this.turnLigthOff();

	this._button = new five.Button(2);

	this._isVlinkerReady = true;
};

Vlinker.prototype.turnLigthOn = function() {
	this._isTheLigthOn = true;
	this._led.color("#FF0000");
};
 
Vlinker.prototype.turnLigthOff = function() { 
		this._led.color("#000000");
		this._isTheLigthOn = false;
};

Vlinker.prototype.initializeResetButton = function() { 
	var _this = this;
	
	this._button .on("down", function() {
		if(_this._isTheLigthOn) {
	    	_this.turnLigthOff();
		} else {
			_this.turnLigthOn();
		}
	});
};

Vlinker.prototype.setLigthColor = function(color){
	this._led.color(color);
};

Vlinker.prototype.isVlinkerReady = function() {
	return this._isVlinkerReady;
}
module.exports = new Vlinker();
