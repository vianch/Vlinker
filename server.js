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
		listener.sockets.on('connection', function(socket){
			console.log("CONNECTED");
		    socket.emit('conection', {'message': 'Successfully connection'});
		});
	}

	nodeEvents() {
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



