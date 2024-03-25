import { URL_SYMBOL_PRICE_API } from "./urls"

const getSymbolPrice = async (symbol: string) => {
    const url = `${URL_SYMBOL_PRICE_API}?symbol=${symbol}`
    const result = await fetch(url);
    const symbolPrice = await result.json()

    return symbolPrice
}

export {getSymbolPrice};