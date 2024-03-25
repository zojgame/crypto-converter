import { useState } from "react";
import Selector from "./components/Selector";
import { Item } from "./types/Item";
import Button from "./components/Button";
import ArrowsRightLeft from "./icons/ArrowsRightLeftIcon";
import CrossIcon from "./icons/CrossIcon";
import { getSymbolPrice } from "./api/binanceApi";
import { DataRequest } from "./types/DataRequest";

const items: Item[] = [
  {
    id: "1",
    image: "/images/eth.png",
    value: "ETH",
  },
  {
    id: "2",
    image: "/images/btc.png",
    value: "BTC",
  },
  {
    id: "30",
    image: "/images/usdt.png",
    value: "USDT",
  },
];

const calculatePrice = (coinCount: number, coinRate: number) =>
  coinCount * coinRate;

function App() {
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [secondItemIndex, setSecondItemIndex] = useState(0);
  const [firstValue, setFirstValue] = useState<string | undefined>(undefined);
  const [secondValue, setSecondValue] = useState<string | undefined>(undefined);

  const handleOnFirstItemSelect = (itemIndex: number) => {
    setFirstItemIndex(itemIndex);
  };

  const handleOnSecondItemSelect = (itemIndex: number) => {
    setSecondItemIndex(itemIndex);
  };

  const handleOnFirstInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setFirstValue(inputValue);
  };

  const handleOnConvertClick = () => {
    const firstSymbol = items[firstItemIndex].value;
    const secondSymbol = items[secondItemIndex].value;
    const wholeSymbol = `${firstSymbol}${secondSymbol}`;
    getSymbolPrice(wholeSymbol).then((data: DataRequest) => {
      const coinRate = Number(data.price);
      const firstCoinValue = Number(firstValue);
      const secondCoinValue = calculatePrice(
        coinRate,
        firstCoinValue
      ).toString();
      setSecondValue(secondCoinValue);
    });
  };

  const handleOnClearClick = () => {
    setFirstValue(undefined);
    setSecondValue(undefined);
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="flex gap-4">
        <Selector
          onChange={handleOnFirstInputChange}
          items={items}
          selectedItem={items[firstItemIndex]}
          onSelect={handleOnFirstItemSelect}
          value={firstValue}
        />
        {/* <ConvertButton onClick={handleOnConvertClick} /> */}
        <Button onClick={handleOnConvertClick} title={"Конвертировать"}>
          <ArrowsRightLeft />
        </Button>
        <Selector
          items={items}
          selectedItem={items[secondItemIndex]}
          onSelect={handleOnSecondItemSelect}
          isReadonly
          value={secondValue}
        />
        <Button onClick={handleOnClearClick} title={"Очистить поля"}>
          <CrossIcon />
        </Button>
      </div>
    </div>
  );
}

export default App;
