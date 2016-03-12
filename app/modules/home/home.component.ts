import { Component, OnInit } from "angular2/core";
import "../../assets/styles/vlinker/main.scss";
import {SocketEventsService} from "../core/socket.events.service";

@Component({
  selector: "vlinker-app",
  template: require("./home.component.html"),
  providers: [SocketEventsService],
})
export default class App implements IHome, OnInit {
    public RGBColors: IRGBColors;

    constructor( private _socketEventsService: SocketEventsService ) { }

    public ngOnInit() {
        this.RGBColors = <IRGBColors> {
            red: 0,
            green: 0,
            blue: 0,
        };
    }

	public setRGBColors(): void {
		this._socketEventsService.setRGBColors(this.RGBColors);
	}

	public setHexColors(hexColor: string): void {
		this._socketEventsService.setHexColors(hexColor);
	}

	public rainbowEffect(): void {
		this._socketEventsService.rainbowEffect();
	}

	public fadeEffect(): void {
		this._socketEventsService.rainbowEffect();
	}
}
