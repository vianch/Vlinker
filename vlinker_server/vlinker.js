var five = require("johnny-five");
var ColorLed = require("./color_led.js");

five.Board().on("ready", function() {
  var color = new ColorLed(true);
  var isOn; 
  var led = new five.Led.RGB({
    pins: {
      red: 9,
      green: 10,
      blue: 11
    }
  });
  var button = new five.Button(2);
  var turnOnLed = function() {
  	isOn = true;
  	led.on();
  };


  // Turn it on and set the initial color
  turnOnLed();
  led.color(color.hexToRgb("#ff0000"));


  button.on("press", function() {

   		if(isOn) {
    		led.color(color.hexToRgb("#000000"));

    	} else {
    		led.color(color.hexToRgb("#ff0000"));
    	}
     isOn = !isOn;

  });

});