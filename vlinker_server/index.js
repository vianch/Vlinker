'use strict';
const http = require('http');
const Vlinker = require("./vlinker.js");

class VServer { 
	constructor(port) { 
		this.server = null;
		this.port = (port) ? port : 8080;
		this.initServer();
		this.initEvents();
	}

	initServer() { 
		this.server = http.createServer( function(req, res)  {
		  res.writeHead(200, {'Content-Type': 'text/plain'});
		  res.end("Hello to ardruino node server");
		}).listen(this.port,  () => {
			   console.log(`Server initialized on port ${this.port}`);
		});
	}

	initEvents() {
		this.server.on('connection', function(stream) {
			if(Vlinker.isVlinkerReady()) {
				Vlinker.setLigthColor("#00FF00");
				console.log('Conection successfull!!');
			} else {
				console.log("VLINKER HARDWARE IS NOT READY YET");
			}
		});

		this.server.on( 'close', function() { 
			if(Vlinker.isVlinkerReady()) { 
				Vlinker.turnLigthOff();
			}
		});
	}
}

new VServer(8081);



