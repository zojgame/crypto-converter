import { useState } from "react";
import Selector from "./components/Selector";
import { Item } from "./types/Item";
import Button from "./components/Button";
import ArrowsRightLeft from "./icons/ArrowsRightLeftIcon";
import CrossIcon from "./icons/CrossIcon";

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
    if (inputValue === "") {
      setSecondValue(undefined);
      setFirstValue(undefined);
    }
  };

  const handleOnConvertClick = () => {
    setSecondValue("2");
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
