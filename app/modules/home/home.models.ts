class ComponentPropertiesVO {
    public RGBColors: IRGBColors;
    public ligthIntensity: number;
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

        this.isMotionSensorActive = true;
    }
}

export {ComponentPropertiesVO}
