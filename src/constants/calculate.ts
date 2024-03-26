const calculatePrice = (coinCount: number, coinRate: number) =>
  (coinCount * coinRate).toFixed(5).toString();

const calculateInvertedPrice = (coinCount: number, coinRate: number) =>
  (coinCount / coinRate).toFixed(5).toString();

export { calculateInvertedPrice, calculatePrice };
