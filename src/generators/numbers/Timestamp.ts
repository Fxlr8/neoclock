import NumbersGenerator from './'

export default class TimestampGenerator implements NumbersGenerator {
    public buffer: Uint8Array
    constructor(buffer: Uint8Array) {
        this.buffer = buffer
    }
    public update() {
        let timestamp = Math.floor(Date.now() / 1000)
        for (let i = 9; i >= 0; i -= 1) {
            this.buffer[i] = timestamp % 10
            timestamp = Math.floor(timestamp / 10)
        }
    }
}