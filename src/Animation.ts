import Display from './Display'

export default interface Animation {
    update: (dt: number) => void
}