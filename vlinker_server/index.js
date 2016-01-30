var http = require('http');
var Vlinker = require("./vlinker.js");


var server = http.createServer( function(req, res)  {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello to ardruino node server");
//  res.end('okay');
}).listen(8081);

server.on('connection', function(stream) {
	if(Vlinker.isVlinkerReady()) {
		Vlinker.setLigthColor("#00FF00");
		console.log('Conection successfull!!');
	} else {
		console.log("VLINKER HARDWARE IS NOT READY YET");
	}
});

server.on( 'close', function() { 
	if(Vlinker.isVlinkerReady()) { 
		Vlinker.turnLigthOff();
	}
});

