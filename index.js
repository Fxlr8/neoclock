const SerialPort = require('serialport')

const uart = new SerialPort('/dev/ttyAMA0', {
	baudRate: 115200
})

const DOTS_COUNT = 9
const LEDS_COUNT = 10
const DIGITS_COUNT = 10

const BUF_SIZE = (DOTS_COUNT * 3) + (LEDS_COUNT * 3) + DIGITS_COUNT

const buffer = new Uint8Array(BUF_SIZE)

for(let i = 0; i < BUF_SIZE; i += 1) {
	buffer[i] = 12
}

buffer[0] = 0
buffer[1] = 128
buffer[2] = 0

buffer[DOTS_COUNT * 3] = 0
buffer[DOTS_COUNT * 3 + 1] = 128
buffer[DOTS_COUNT * 3 + 2] = 0

buffer[LEDS_COUNT * 3] = 128
buffer[LEDS_COUNT * 3 + 1] = 0
buffer[LEDS_COUNT * 3 + 2] = 0

uart.write(buffer)


let v = 0
let a = 1

function setDot(n, r, g, b) {
	const offset = (LEDS_COUNT + n - 1) * 3
	buffer[offset] = r
	buffer[offset + 1] = g
	buffer[offset + 2] = b
}

function setLamp(n, r, g, b) {
        const offset = (n - 1) * 3
        buffer[offset] = r
        buffer[offset + 1] = g
        buffer[offset + 2] = b
}

setInterval(function(){
	for(let i = 0; i < LEDS_COUNT + DOTS_COUNT; i += 1) {
        	buffer[i * 3] = 30
        	buffer[i * 3 + 1] = 0
        	buffer[i * 3 + 2] = 30
	}
	setDot(1, 128, 0, 0)
	setDot(9, 128, 0, 0)

	setLamp(1, 0, 128, 0)
	setLamp(10, 0, 128, 0)

/*
	buffer[0] = 0
	buffer[1] = 128
	buffer[2] = 0

        buffer[DOTS_COUNT * 3] = 0
        buffer[DOTS_COUNT * 3 + 1] = 128
        buffer[DOTS_COUNT * 3 + 2] = 0

        buffer[DOTS_COUNT * 3] = 128
        buffer[DOTS_COUNT * 3 + 1] = 0
        buffer[DOTS_COUNT * 3 + 2] = 0

	v += 1
	if(v >= 19) {
		v = 0
	}
*/
	uart.write(buffer)
}, 200)

