interface NumbersGenerator {
    update: () => Uint8Array
}

export default class TimestampGenerator implements NumbersGenerator {
    constructor(buffer: Uint8Array) {
        this.buffer = buffer
    }
    public buffer = new Uint8Array(10)
    public update() {
        let timestamp = Math.floor(Date.now() / 1000)
        for (let i = 9; i >= 0; i -= 1) {
            this.buffer[i] = timestamp % 10
            timestamp = Math.floor(timestamp / 10)
        }
        return this.buffer
    }
}