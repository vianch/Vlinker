import { Component } from "angular2/core";
import {SocketEventsService} from "../core/socket.events.service";
import {CameraVO} from "./camera.models";

@Component({
    selector: "camera-component",
    styles: [ require("../../assets/styles/vlinker/camera.scss").toString()],
    template: require("./camera.component.html"),
})
export default class CameraComponent {

    public cameraData: CameraVO;

    constructor( private _socketEventsService: SocketEventsService) {
        this.cameraData = new CameraVO();
    }

    public shootCamera(): void {
        this._socketEventsService.rainbowEffect();
        this._socketEventsService.triggerCamera(this.cameraData.triggerTime * 1000);
    }

    public changeTimer(isIncreasingTime: string): void {
        this.cameraData.timer =
            (this.cameraData.triggerTime > 0) ?
                (isIncreasingTime) ?
                    ++this.cameraData.triggerTime : --this.cameraData.triggerTime : 0;
    }

}
