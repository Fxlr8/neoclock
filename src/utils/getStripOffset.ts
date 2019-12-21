import { LIGHTS_COUNT } from '../Display'

/**
 * буфер устроен таким образом, что сначала идут данные для подсветки ламп, а потом для подсветки точек
 * эта функция позволяет заполнять буфер как для единой ленты светодиодов
 */
export default function getStripOffset(pos: number) {
    if ((pos - 1) % 2 === 0) {
        // четные позиции в буфер подсветки ламп
        return Math.round((pos - 1) / 2)
    } else {
        // нечетные позиции в буфер подсветки точек
        return (LIGHTS_COUNT + Math.round(pos / 2)) * 3
    }
}