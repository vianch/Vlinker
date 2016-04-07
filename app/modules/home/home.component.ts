import { Component, OnInit } from "angular2/core";
import "../../assets/styles/vlinker/home.scss";
import {SocketEventsService} from "../core/socket.events.service";


@Component({
  selector: "vlinker-app",
  template: require("./home.component.html"),
  providers: [SocketEventsService],
})
export default class App implements IHome, OnInit {
    public RGBColors: IRGBColors;
    public triggerTime: number;
    public timer: number;
    public ligthIntensity: number;
    public isRainbowEffectActive: boolean;

    constructor( private _socketEventsService: SocketEventsService ) { }

    public ngOnInit() {
        this.RGBColors = <IRGBColors> {
            red: 0,
            green: 0,
            blue: 0,
        };
        this.triggerTime = 1;
        this.ligthIntensity = 0;
        this.isRainbowEffectActive = false;
    }

	public setRGBColors(): void {
		this._socketEventsService.setRGBColors(this.RGBColors);
	}

	public setHexColors(hexColor: string): void {
		this._socketEventsService.setHexColors(hexColor);
	}

    public changeLigthIntensity(): void {
        this.ligthIntensity = (this.ligthIntensity === 0) ? 100 : 0;
        this._socketEventsService.setIntensity(this.ligthIntensity);
    }

	public rainbowEffect(): void {
        if (this.isRainbowEffectActive) {
                this._socketEventsService.setHexColors("#000000");
                this.isRainbowEffectActive = false;
        } else {
            this._socketEventsService.rainbowEffect();
            this.isRainbowEffectActive = true;
        }
	}

	public fadeEffect(): void {
		this._socketEventsService.fadeEffect();
	}

    public shootCamera(): void {
        this._socketEventsService.rainbowEffect();
        this._socketEventsService.triggerCamera(this.triggerTime * 1000);
    }

    public changeTimer(isIncreasingTime: string): void {
        this.timer = (this.triggerTime > 0) ? (isIncreasingTime) ? ++this.triggerTime : --this.triggerTime : 0;
    }

}
