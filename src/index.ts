import Display from './Display'
import Rainbow from './generators/leds/Rainbow'
import Fire from './generators/leds/Fire'
import Timestamp from './generators/numbers/Timestamp'
import NumberFire from './generators/numbers/Fire'

// const display = new Display('/dev/ttyAMA0')
const display = new Display('/dev/tty.wchusbserial1410')
const rainbow = new Rainbow(display.getLedsBuffer(), 0, 1 / 57, 0.001)
const fire = new Fire(display.getLedsBuffer())
const timestamp = new Timestamp(display.getDigitsBuffer())
const numberFire = new NumberFire(display.getDigitsBuffer())

setInterval(() => {
    // fire.update()
    // numberFire.update()
    timestamp.update()
    rainbow.update()
    display.show()
}, 20)
