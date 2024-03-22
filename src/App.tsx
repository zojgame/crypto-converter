import { useState } from "react";
import Selector from "./components/Selector";
import { Item } from "./types/Item";

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
  const [firstValue, setFirstValue] = useState<number | null>(null);

  const handleOnFirstItemSelect = (itemIndex: number) => {
    setFirstItemIndex(itemIndex);
  };

  const handleOnFirstInputChange = (
    event: React.KeyboardEvent<HTMLInputElement>
    // event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target;
    console.log("value", (value as HTMLInputElement).value);
    if (Number.isNaN(Number(value))) {
      // event.preventDefault();
    } else {
      const number = Number(value);
      setFirstValue(number);
    }
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
        {/* <Selector
          items={items}
          selectedItem={items[firstItemIndex]}
          onSelect={handleOnFirstItemSelect}
          isReadonly
        /> */}
      </div>
    </div>
  );
}

export default App;
