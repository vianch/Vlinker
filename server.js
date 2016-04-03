'use strict';

const http = require('http');
const url = require("url");
const path = require("path");
const fs = require("fs")
const io = require('socket.io');

const Vlinker = require("./vlinker/vlinker.js");

class VServer { 
	constructor(port) { 
		this.server = null;
		this.socket = null;
		this.port = (port) ? port : 8080;
		this.initServer();
		this.initEvents();

	}

	initServer() { 
		this.server = http.createServer( (req, res) => {

		 	let uri = url.parse(req.url).pathname,
    		    filename = path.join(process.cwd(), uri);
    			this.initServerPath(filename,res);

		}).listen(this.port,  () => {
			   console.log(`Server initialized on port ${this.port}`);
		});
	}

	initServerPath(filename,response) {
		fs.exists(filename, (exists) => {
		    if(!exists) {
		      response.writeHead(404, {"Content-Type": "text/plain"});
		      response.write("404 Not Found\n");
		      response.end();
		      return;
		    }

		    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

		    fs.readFile(filename, "binary", (err, file) => {
		      if(err) {        
		        response.writeHead(500, {"Content-Type": "text/plain"});
		        response.write(err + "\n");
		        response.end();
		        return;
		      }

		      response.writeHead(200);
		      response.write(file, "binary");
		      response.end();
		    });
		  });
	}

	initEvents() {
		this.nodeEvents();
		this.socketIOEvents();
	}


	socketIOEvents() {
		let listener = io.listen(this.server);
		listener.sockets.on('connection', (socket) => {
			this.socket = socket;
		    this.socketConectionEvent();
		    this.socketSetColorEvent();
		    this.socketRainbowEvent();
		    this.socketFadeEvent();
			this.socketTriggercameraEvent();
		});
	}

	socketConectionEvent() {
		this.socket.emit('conection', {'message': 'Successfully connection'});
	}

	socketSetColorEvent() {
		if(Vlinker.isVlinkerReady()) {
			this.socket.on('setColors', (RGBcolors) => {
			  Vlinker.clearIntervals();
			  Vlinker.setLigthColor(RGBcolors.color);
			//Vlinker.setLCDMessage(`R:${RGBcolors.red},G:${RGBcolors.green},B:${RGBcolors.blue} `);
			});
		}
	}

	socketRainbowEvent() {
		if(Vlinker.isVlinkerReady()) { 
			this.socket.on('rainbowColors', (data) => {
				console.log("RAINBOW START");
			  Vlinker.rainbowEfect();
			});
		}
	
	}

	socketFadeEvent() {
		if(Vlinker.isVlinkerReady()) { 
			this.socket.on('fadeColors', (data) => {
				console.log("FADE START");
			  	Vlinker.fadeEffect(100,2000);
			});
		}
	}
	
	socketTriggercameraEvent() {
		if(Vlinker.isVlinkerReady()) {
			this.socket.on('triggerCamera', (data) => {
				Vlinker.triggerCamera(data.stateTrigger);
			});
		}
	}

	nodeEvents() {
		this.server.on('connection', (stream) => {
			if(Vlinker.isVlinkerReady()) {
				//Vlinker.setLCDMessage('PC: CONNECTED!');
			} else {
				console.log("VLINKER NOT READY YET");
			}
		});

		this.server.on( 'close', () => { 
			if(Vlinker.isVlinkerReady()) { 
				Vlinker.turnLigthOff();
			}
		});
	}
}

new VServer(8081);



