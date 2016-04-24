import { Component, OnInit } from "angular2/core";
import {SocketEventsService} from "../core/socket.events.service";
import {ComponentPropertiesVO} from "./home.models";
import CameraComponent from "../camera/camera.component";


@Component(<any>{
  selector: "vlinker-app",
  template: require("./home.component.html"),
  styles: [ require("../../assets/styles/vlinker/home.scss").toString()],
  directives: [ CameraComponent ],
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
        this.toggleMotionSensorState();
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

    private toggleMotionSensorState(): void {
        if (this._componentsProperties.ligthIntensity === 0) {
            this._socketEventsService.turnOffMotionSensor();
            this._componentsProperties.isMotionSensorActive = false;
        } else {
            this._socketEventsService.turnOnMotionSensor();
            this._componentsProperties.isMotionSensorActive = true;
        }
    }
}
