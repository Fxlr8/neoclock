import hsv2rgb from '../../HSV2RGB'
import getStripOffset from '../../utils/getStripOffset'
import LedsGenerator from './'

export default class Rainbow implements LedsGenerator {
    public startHue = 0.0
    public saturation = 1.0
    public lightness = 1.0
    public buffer: Uint8Array
    public dotCount = 0
    public step = 0
    public speed = 0
    constructor(dotBuffer: Uint8Array, startHue: number, step: number, speed: number) {
        this.buffer = dotBuffer
        this.startHue = startHue
        this.step = step
        this.speed = speed
        this.dotCount = Math.round(dotBuffer.length / 3)
    }

    update() {
        for (let i = 0; i < this.dotCount; i++) {
            const offset = getStripOffset(i + 1)
            const [r, g, b] = hsv2rgb((this.startHue + (i * this.step)) % 1, this.saturation, 1)
            this.buffer[offset] = r
            this.buffer[offset + 1] = g
            this.buffer[offset + 2] = b
        }
        this.startHue += this.speed
    }
}