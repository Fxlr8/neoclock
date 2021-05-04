import hsv2rgb from '../../HSV2RGB'
import getStripOffset from '../../utils/getStripOffset'
import LedsGenerator from './'

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

const MAX_STEPS = 100

export default class Flip {
    good = [3, 166, 10] // зеленый 
    bad = [207, 48, 74] // красный
    result = [0, 0, 0]

    step = 0

    update(ok: boolean) {
        if (ok && this.step < MAX_STEPS) {
            this.step += 1
        } else if (!ok && this.step > 0) {
            this.step -= 1
        }

        for (let i = 0; i < this.result.length; i++) {
            this.result[i] = Math.round(lerp(this.bad[i], this.good[i], this.step / MAX_STEPS))
        }
    }
}