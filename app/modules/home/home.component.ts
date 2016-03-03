import { Component, OnInit } from "angular2/core";
import "../../assets/styles/vlinker/main.scss";

@Component({
  selector: "vlinker-app",
  template: require("./home.component.html"),

})
export default class App implements OnInit, IHome {
	public RGBcolors: IRGBColors;
	private socket: Socket;
	
	constructor() {
		this.socketIOConnection(window.location.href);
	}

	ngOnInit() {
		this.RGBcolors = <IRGBColors>{
			red: 0,
			green: 0,
			blue: 0
		};
	}

	private socketIOConnection(server: string): void {
		this.socket = io.connect(server);
		this.socket.on("conection", (data: { message: string }) => {
			console.log(data.message);
		});
	}

	//TODO: quitar los llamados a socket.io y colocarlos en socket.events.service
	public setRGBColors($evemt): void {
		this.socket.emit("setColors", { color: this.RGBcolors });
	}

	public setHexColors(hexColor: string): void {
		this.socket.emit("setColors", { color: hexColor });
	}

	public rainbowEffect(): void {
		this.socket.emit("rainbowColors", {data: ""});
	}

	public fadeEffect(): void {
		this.socket.emit("fadeColors", { data: "" });
	}
}
