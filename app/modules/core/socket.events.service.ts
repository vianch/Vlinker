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

    public rainbowEffect(): void {
        this.socket.emit("rainbowColors", {data: ""});
    }

    public fadeEffect(): void {
        this.socket.emit("fadeColors", { data: "" });
    }

    private socketIOConnection(server: string): void {
        this.socket = io.connect(server);
        this.socket.on("conection", (data: { message: string }) => {
            console.log(data.message);
        });
    }
}

export {SocketEventsService}
