import { useState } from "react";
import Selector from "./Selector";
import Button from "./Button";
import ArrowsRightLeft from "../icons/ArrowsRightLeftIcon";
import CrossIcon from "../icons/CrossIcon";
import { getSymbolPrice } from "../api/binanceApi";
import { DataRequest } from "../types/DataRequest";
import LoaderModal from "./LoaderModal";
import { SYMBOL_ITEMS } from "../constants/symbolItems";
import { calculatePrice, calculateInvertedPrice } from "../constants/calculate";

function MainPage() {
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [secondItemIndex, setSecondItemIndex] = useState(0);
  const [firstValue, setFirstValue] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string>("");
  const [modal, setModal] = useState<React.ReactNode | null>(null);

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
    const firstSymbol = SYMBOL_ITEMS[firstItemIndex].value;
    const secondSymbol = SYMBOL_ITEMS[secondItemIndex].value;
    if (firstSymbol !== secondSymbol) {
      const wholeSymbol = `${firstSymbol}${secondSymbol}`;
      const firstCoinValue = Number(firstValue);
      setModal(<LoaderModal />);
      getSymbolPrice(wholeSymbol)
        .then((data: DataRequest) => {
          const coinRate = Number(data.price);
          const secondCoinValue = calculatePrice(coinRate, firstCoinValue);
          setSecondValue(secondCoinValue);
        })
        .catch(() => {
          const wholeSymbol = `${secondSymbol}${firstSymbol}`;
          getSymbolPrice(wholeSymbol).then((data: DataRequest) => {
            const coinRate = Number(data.price);
            const secondCoinValue = calculateInvertedPrice(
              firstCoinValue,
              coinRate
            );
            setSecondValue(secondCoinValue);
          });
        })
        .finally(() => setModal(null));
    } else {
      setSecondValue(firstValue);
    }
  };

  const handleOnClearClick = () => {
    setFirstValue("");
    setSecondValue("");
  };

  return (
    <>
      {modal}
      <div className="bg-slate-500 h-screen flex justify-center items-center">
        <div className="flex gap-4 flex-wrap justify-center">
          <Selector
            onChange={handleOnFirstInputChange}
            items={SYMBOL_ITEMS}
            selectedItem={SYMBOL_ITEMS[firstItemIndex]}
            onSelect={handleOnFirstItemSelect}
            value={firstValue}
          />
          <Button onClick={handleOnConvertClick} title={"Конвертировать"}>
            <ArrowsRightLeft />
          </Button>
          <Selector
            items={SYMBOL_ITEMS}
            selectedItem={SYMBOL_ITEMS[secondItemIndex]}
            onSelect={handleOnSecondItemSelect}
            isReadonly
            value={secondValue}
          />
          <Button onClick={handleOnClearClick} title={"Очистить поля"}>
            <CrossIcon />
          </Button>
        </div>
      </div>
    </>
  );
}

export default MainPage;
