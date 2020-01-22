import Display from './Display'
import Animation from './Animation'

const msPerFrame = 16

export default class DisplayController {
    public display: Display
    public animation?: Animation
    public nextAnimation?: Animation
    private interval: NodeJS.Timeout
    private fadeTarget = 1
    private fade = 0
    private turningOff = false

    constructor(display: Display) {
        this.display = display
    }

    setAnimation(animation: Animation) {

    }

    off() {
        this.turningOff = true
        this.fadeTarget = 0
    }

    on() {
        this.turningOff = false
        this.fadeTarget = 1
        this.interval = setInterval(() => {
            this.animate()
        }, msPerFrame)
    }

    animate() {
        this.animation.update(msPerFrame)

        if (Math.abs(this.fade - this.fadeTarget) > 0.01) {
            this.fade = this.fade + (this.fadeTarget - this.fade) * 0.02
        } else {
            if (this.fadeTarget === 0) {
                clearInterval(this.interval)
            }
            this.display.getDigitsBuffer().fill(11)
            this.display.getLedsBuffer().fill(0)
        }

        this.display.show()
    }
}