/// <reference path="home.d.ts" />
/// <reference path="socket.events.service.d.ts" />

declare const io: {
    connect(url: string): Socket;
}

interface Socket {
    on(event: string, callback: (data: any) => void);
    emit(event: string, data: any);
}

interface IRGBColors {
	red: number;
	green: number;
	blue: number;
}