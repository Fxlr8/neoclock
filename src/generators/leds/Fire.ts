import getStripOffset from '../../utils/getStripOffset'
import SimplexNoise from 'simplex-noise'
import LedsGenerator from './index'

type Color = [number, number, number]

const black = [75, 20, 20]

const red = [255, 42, 0]

const yellow = [252, 204, 0]

const pivot = 0.3

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

export default class FireGenerator implements LedsGenerator {
    public buffer: Uint8Array
    public noise: SimplexNoise
    public dotCount: number
    public t = 0
    constructor(dotBuffer: Uint8Array) {
        this.buffer = dotBuffer
        this.dotCount = Math.round(dotBuffer.length / 3)
        this.noise = new SimplexNoise()
    }
    update() {
        for (let i = 0; i < this.dotCount; i++) {
            const offset = getStripOffset(i + 1)
            const a = this.noise.noise2D(i / 9, (this.t * 0.1) / 9) * 0.5 + 0.5;
            const [r, g, b] = this.getGradient(a)
            this.buffer[offset] = r
            this.buffer[offset + 1] = g
            this.buffer[offset + 2] = b
        }
        this.t += 1
    }

    private getGradient(v: number): Color {
        const color: Color = [0, 0, 0]
        if (v < pivot) {
            const n = v / pivot
            color[0] = lerp(black[0], red[0], n)
            color[1] = lerp(black[1], red[1], n)
            color[2] = lerp(black[2], red[2], n)
        } else {
            const n = (v - pivot) / (1 - pivot)
            color[0] = lerp(red[0], yellow[0], n)
            color[1] = lerp(red[1], yellow[1], n)
            color[2] = lerp(red[2], yellow[2], n)
        }
        return color
    }
}
