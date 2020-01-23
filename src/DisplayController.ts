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
        if (this.animation) {
            this.fadeTarget = 0
            this.nextAnimation = animation
        } else {
            this.animation = animation
        }
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
        if (!this.display.ready) {
            return
        }
        this.animation.update(msPerFrame)

        if (Math.abs(this.fade - this.fadeTarget) > 0.01) {
            this.fade = this.fade + (this.fadeTarget - this.fade) * 0.05
        } else {
            if (this.fadeTarget === 0) {
                this.display.getDigitsBuffer().fill(11)
                this.display.getLedsBuffer().fill(0)
                if (this.turningOff) {
                    clearInterval(this.interval)
                    console.log('display turned off')
                } else if (this.nextAnimation) {
                    this.animation = this.nextAnimation
                    this.fadeTarget = 1
                }
            }
        }

        const buf = this.display.getLedsBuffer()
        for (let i = 0; i < buf.length; i++) {
            buf[i] = Math.round(buf[i] * this.fade);
        }

        this.display.show()
    }
}