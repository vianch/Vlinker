import { Component, OnInit } from "angular2/core";
import "../../assets/styles/vlinker/home.scss";
import {SocketEventsService} from "../core/socket.events.service";
import {ComponentPropertiesVO} from "./home.models";


@Component({
  selector: "vlinker-app",
  template: require("./home.component.html"),
  providers: [SocketEventsService],
})
export default class App implements IHome, OnInit {
    public _componentsProperties: ComponentPropertiesVO;

    constructor( private _socketEventsService: SocketEventsService ) {
        this._componentsProperties = new ComponentPropertiesVO();
    }

    public ngOnInit() {
        console.log("Home view initialized");
    }

	public setRGBColors(): void {
		this._socketEventsService.setRGBColors(this._componentsProperties.RGBColors);
	}

	public setHexColors(hexColor: string): void {
		this._socketEventsService.setHexColors(hexColor);
	}

    public changeLigthIntensity(): void {
        this._componentsProperties.ligthIntensity = (this._componentsProperties.ligthIntensity === 0) ? 100 : 0;
        this._socketEventsService.setIntensity(this._componentsProperties.ligthIntensity);
    }

	public rainbowEffect(): void {
        if (this._componentsProperties.isRainbowEffectActive) {
                this._socketEventsService.setHexColors("#000000");
                this._componentsProperties.isRainbowEffectActive = false;
        } else {
            this._socketEventsService.rainbowEffect();
            this._componentsProperties.isRainbowEffectActive = true;
        }
	}

    public motionSensorTrigger(): void {
        if ( this._componentsProperties.isMotionSensorActive ) {
            this._socketEventsService.endMotionSensor();
        } else {
            this._socketEventsService.startMotionSensor();
        }
        this._componentsProperties.isMotionSensorActive = !this._componentsProperties.isMotionSensorActive;
    }

	public fadeEffect(): void {
		this._socketEventsService.fadeEffect();
	}

    public shootCamera(): void {
        this._socketEventsService.rainbowEffect();
        this._socketEventsService.triggerCamera(this._componentsProperties.triggerTime * 1000);
    }

    public changeTimer(isIncreasingTime: string): void {
        this._componentsProperties.timer =
            (this._componentsProperties.triggerTime > 0) ?
                (isIncreasingTime) ?
                    ++this._componentsProperties.triggerTime : --this._componentsProperties.triggerTime : 0;
    }

}
