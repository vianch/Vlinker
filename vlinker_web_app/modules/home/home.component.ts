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
		this.socketIOConnection("http://192.168.1.4:8081");
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

	public setRGBColors($evemt) {
		this.socket.emit("setColors", { color: this.RGBcolors });
	}

	public setHexColors(hexColor: string) {
		this.socket.emit("setColors", { color: hexColor });
	}
}
