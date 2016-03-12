interface ISocketEventsService {
    setRGBColors(RGBColors: IRGBColors): void;
    setHexColors(hexColor: string): void;
    rainbowEffect(): void;
    fadeEffect(): void;
}