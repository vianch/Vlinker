class ComponentPropertiesVO {
    public RGBColors: IRGBColors;
    public ligthIntensity: number;
    public triggerTime: number;
    public timer: number;
    public isRainbowEffectActive: boolean;
    public isMotionSensorActive: boolean;

    constructor() {
        this.isRainbowEffectActive = false;
        this.RGBColors = <IRGBColors> {
            red: 0,
            green: 0,
            blue: 0,
        };
        this.ligthIntensity = 0;
        this.timer = null;
        this.triggerTime = 1;
        this.isMotionSensorActive = true;
    }
}

export {ComponentPropertiesVO}
