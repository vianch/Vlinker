interface ISocketEventsService {
    endMotionSensor(): void
    fadeEffect(): void;
    setRGBColors(RGBColors: IRGBColors): void;
    setHexColors(hexColor: string): void;
    setIntensity(intensity: number): void;
    startMotionSensor(): void;
    rainbowEffect(): void;
    triggerCamera(timeOut: number): void;
    turnOnMotionSensor(): void;
    turnOffMotionSensor(): void;
}