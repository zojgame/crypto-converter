import { URL_SYMBOL_PRICE_API } from "./urls"

const getSymbolPrice = (symbol: string) => {
    const url = `${URL_SYMBOL_PRICE_API}?symbol=${symbol}`
    const symbolPrice = fetch(url);

    return symbolPrice
}

export {getSymbolPrice};