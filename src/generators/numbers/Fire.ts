import NumbersGenerator from './'
import SimplexNoise from 'simplex-noise'

export default class FireGenerator implements NumbersGenerator {
    public noise: SimplexNoise
    public buffer: Uint8Array
    public t = 0
    constructor(buffer: Uint8Array) {
        this.buffer = buffer
        this.noise = new SimplexNoise()
    }
    public update() {
        for (let i = 9; i >= 0; i -= 1) {
            const n = i * 2 // диодов в два раза больше, чем ламп
            const a = this.noise.noise2D(n / 9, (this.t * 0.1) / 9) * 0.5 + 0.5;
            this.buffer[i] = Math.floor(a * 10)
        }
        this.t += 1
    }
}