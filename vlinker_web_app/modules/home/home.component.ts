import { Component, OnInit } from "angular2/core";
import "../../assets/styles/vlinker/main.scss";

@Component({
  selector: "vlinker-app",
  template: require("./home.component.html"),

})
export default class App implements OnInit {
	public redValue: number;
	private socket: Socket;
	
	constructor() {
		this.socketIOConnection("http://localhost:8081");
	}

	ngOnInit() {
		this.redValue = 180;
	}

	private socketIOConnection(server: string): void {
		this.socket = io.connect(server);
		this.socket.on("conection", (data: { message: string }) => {
			console.log(data.message);
		});
	}
}
