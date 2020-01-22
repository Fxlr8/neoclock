import Display from './Display'

export default interface Animation {
    constructor: (display) => Animation
    update: (dt: number) => void
}