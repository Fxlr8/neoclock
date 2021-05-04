import SerialPort from 'serialport'
import getStripOffset from './utils/getStripOffset'

const DOTS_COUNT = 9
const LIGHTS_COUNT = 10
const DIGITS_COUNT = 10
const LEDS_COUNT: number = DOTS_COUNT + LIGHTS_COUNT

const BUF_SIZE = (DOTS_COUNT * 3) + (LIGHTS_COUNT * 3) + DIGITS_COUNT

/*
    Управление дисплеем осуществляется по UART.
    Устройство принимает буффер Uint8array следующего вида:
    [
        LIGHTS_COUNT * 3 байт для подсветки ламп, по три байта (R, G, B) на каждую лампу
        DOTS_COUNT * 3 байт для подсветки точек между лампами, по три байта (R, G, B) на каждую лампу
        DIGITS_COUNT байт для значений цифр на каждой лампе
    ]
    
    Частота UART = 115200
    Как только устройство получает новый буффер, оно сохраняет и отображает его до тех пор,
    пока не будет получен следующий.
*/

export default class NixieDisplay {
    private uart: SerialPort
    public buffer = new Uint8Array(BUF_SIZE)
    public ready = false

    constructor(dev: string) {
        this.uart = new SerialPort(dev, {
            baudRate: 115200
        }, () => {
            this.ready = true
        })
    }

    public setDot(pos: number, r: number, g: number, b: number) {
        const offset = (LIGHTS_COUNT + pos) * 3
        this.buffer[offset] = r
        this.buffer[offset + 1] = g
        this.buffer[offset + 2] = b
    }

    public setLamp(pos: number, r: number, g: number, b: number) {
        const offset = pos * 3
        this.buffer[offset] = r
        this.buffer[offset + 1] = g
        this.buffer[offset + 2] = b
    }

    public setDigit(pos: number, d: number) {
        const offset = (LIGHTS_COUNT + DOTS_COUNT + pos) * 3
        this.buffer[offset] = d
    }

    public setStrip(pos: number, r: number, g: number, b: number) {
        let offset = getStripOffset(pos)
        this.buffer[offset] = r
        this.buffer[offset + 1] = g
        this.buffer[offset + 2] = b
    }

    public setDataFromString(data?: string) {
        if (!data) return
        let digitPos = 0
        for (let i = 0; i < data.length; i++) {
            const code = data.charCodeAt(i)

            if (code >= 48 && code <= 57) {
                // цифра [0, 9]
                this.setDigit(digitPos, code - 48)
                digitPos += 1
            } else if (code === 44 || code === 46) {
                // точка или запятая
                this.setDot(digitPos - 1, 120, 55, 10) // точка цвета горения лампы
            }
        }
    }

    public fillLamps(r: number, g: number, b: number) {
        for (let i = 0; i < LIGHTS_COUNT; i++) {
            this.setLamp(i, r, g, b)
        }
    }

    public getLedsBuffer() {
        return this.buffer.subarray(0, LEDS_COUNT * 3)
    }

    public getDigitsBuffer() {
        return this.buffer.subarray(LEDS_COUNT * 3, BUF_SIZE)
    }

    public show() {
        this.ready = false
        //@ts-ignore
        this.uart.write(this.buffer)
        this.uart.drain(() => {
            this.ready = true
        })
    }
}

export {
    DOTS_COUNT,
    LIGHTS_COUNT,
    DIGITS_COUNT,
    LEDS_COUNT
}