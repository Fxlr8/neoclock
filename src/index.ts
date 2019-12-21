import Display from './Display'
import Rainbow from './generators/leds/Rainbow'
import Timestamp from './generators/numbers/Timestamp'

const display = new Display('/dev/ttyAMA0')
const rainbow = new Rainbow(display.getLedsBuffer(), 0, 0, 0.05)
const time = new Timestamp(display.getDigitsBuffer())

setInterval(() => {
    rainbow.update()
    time.update()
    display.show()
}, 20)