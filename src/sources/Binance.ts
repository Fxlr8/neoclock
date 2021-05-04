import got from 'got'

const priceQuery = 'https://binance.com/api/v3/avgPrice?symbol='

interface priceQueryResponse {
    mins: number,
    price: string
}

export default class BinanceSource {
    public price: string
    public grows = false
    private query: string

    constructor(pair: string) {
        this.query = priceQuery + pair
        this.poll()
        setInterval(this.poll, 1000)
    }

    poll = async () => {
        try {
            const response = await got<priceQueryResponse>(this.query, {
                responseType: 'json'
            })
            const newPrice = response.body.price

            this.grows = parseFloat(newPrice) >= parseFloat(this.price)
            this.price = newPrice
        } catch (error) {
            console.log(error.response.body);
        }
    }
}