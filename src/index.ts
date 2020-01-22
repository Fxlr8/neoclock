import Display from './Display'
import Rainbow from './generators/leds/Rainbow'
import Fire from './generators/leds/Fire'
import Timestamp from './generators/numbers/Timestamp'
import NumberFire from './generators/numbers/Fire'
import Animation from './Animation'
import DisplayController from './DisplayController'



const display = new Display('/dev/ttyAMA0')
// const display = new Display('/dev/tty.wchusbserial1410')
const rainbow = new Rainbow(display.getLedsBuffer(), 0, 1 / 57, 0.001)
const fire = new Fire(display.getLedsBuffer())
const timestamp = new Timestamp(display.getDigitsBuffer())
const numberFire = new NumberFire(display.getDigitsBuffer())

// setInterval(() => {
//     // fire.update()
//     // numberFire.update()
//     timestamp.update()
//     rainbow.update()
//     display.show()
// }, 20)

const rainbowTimestampAnimation: Animation = {
    update: () => {
        rainbow.update()
        timestamp.update()
    }
}

const fireAnimation: Animation = {
    update: () => {
        fire.update()
        numberFire.update()
    }
}

const bd = 824947200

const BDAnimation: Animation = {
    update: () => {
        let time = Math.floor(Date.now() / 1000) - bd
        const buf = display.getDigitsBuffer()
        let n = 0
        for (let i = 9; i >= 0; i -= 1) {
            n += 1
            if (time === 0) {
                buf[i] = 11
            } else {
                buf[i] = time % 10
                time = Math.floor(time / 10)
                if (n === 3 && time !== 0) {
                    display.setDot(i, 120, 55, 10)
                    n = 0
                }
            }

        }
    }
}

const displayController = new DisplayController(display)
displayController.setAnimation(BDAnimation)
displayController.on()

const animations = [
    rainbowTimestampAnimation,
    fireAnimation,
    BDAnimation
]

let a = 0

setInterval(() => {
    if (a > animations.length) {
        a = 0
    }
    displayController.setAnimation(animations[a])
    a += 1
}, 60 * 1000)
// setTimeout(() => {
//     displayController.setAnimation(fireAnimation)
// }, 3000)
