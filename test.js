var five = require("johnny-five");

board = new five.Board();
// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  this.pinMode(5, this.MODES.OUTPUT);

  this.digitalWrite(5, 1);
  console.log("disparo");
});