import { Injectable } from "angular2/core";

@Injectable()
class SocketEventsService implements  ISocketEventsService {
    private socket: Socket;

    constructor() {
        this.socketIOConnection(window.location.href);
    }

    public setRGBColors(RGBColors: IRGBColors): void {
        this.socket.emit("setColors", { color: RGBColors });
    }

    public setHexColors(hexColor: string): void {
        this.socket.emit("setColors", { color: hexColor });
    }

    public setIntensity(intensity: number): void {
        this.socket.emit("setIntensity", { intensity : intensity});
    }

    public rainbowEffect(): void {
        this.socket.emit("rainbowColors", {data: ""});
    }

    public fadeEffect(): void {
        this.socket.emit("fadeColors", { data: "" });
    }

    public triggerCamera(timeOut): void {
        this.socket.emit("triggerCamera", { stateTrigger: 1});
        setTimeout(() => {
            this.socket.emit("triggerCamera", { stateTrigger: 0});
            this.socket.emit("setColors", { color: "#000000" });
        }, timeOut);

    }

    private socketIOConnection(server: string): void {
        this.socket = io.connect(server);
        this.socket.on("conection", (data: { message: string }) => {
            console.log(data.message);
        });
    }
}

export {SocketEventsService}
