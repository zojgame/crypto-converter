import { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Item } from "../types/Item";

interface ISelectorProps {
  items: Item[];
  selectedItem: Item;
  onSelect: (itemIndex: number) => void;
  isReadonly?: boolean;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Selector = ({
  items,
  selectedItem,
  onSelect,
  value,
  onChange,
  isReadonly = false,
}: ISelectorProps) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const selectorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnItemClick = (index: number) => {
    onSelect(index);
    setIsSelectorOpen(false);
  };

  const handleClickOutside = () => {
    setIsSelectorOpen(false);
  };

  const handleOnSelectorClick = () => {
    setIsSelectorOpen((prev) => !prev);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ".") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);
  useOnClickOutside(selectorRef, handleClickOutside);

  return (
    <div className="flex">
      <label className="relative cursor-text">
        <input
          ref={inputRef}
          onKeyDown={handleOnKeyDown}
          readOnly={isReadonly}
          type="number"
          onChange={onChange}
          defaultValue={value ? value : ""}
          className="px-[19px] w-[200px] h-[45px] rounded-s-[10px] focus:outline-none peer/name border border-white hover:border-[#0078EE] transition-all duration-150"
        />
        {!isReadonly && (
          <p
            className={`${
              value ? "opacity-0" : "opacity-100"
            } select-none absolute text-[#ADB6BF] text-[14px] translate-x-[19px] translate-y-[-34.5px] peer-focus/name:translate-y-[-44.0px] peer-focus/name:text-[12px] transition-all duration-150 `}
          >
            Введите количество
          </p>
        )}
      </label>
      <div className="relative" ref={selectorRef}>
        <button
          title="Выбрать валюту"
          className="h-[45px] bg-white  rounded-e-[10px] border boder-l cursor-pointer hover:border-[#0078EE] transition-all duration-150 select-none flex flex-col justify-center items-center"
          onClick={handleOnSelectorClick}
        >
          <div className="flex gap-2 justify-center items-center h-full px-3">
            <div className="w-3 h-3 flex justify-center items-center">
              <img src={selectedItem.image} alt={selectedItem.value} />
            </div>
            <div
              className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[7px] border-[#ADB6BF] border-r-[6px] border-r-transparent transition-all duration-300"
              style={{
                transform: `rotate(${isSelectorOpen ? "180deg" : "0"})`,
              }}
            ></div>
          </div>
          <div className="font-bold text-[10px]">{selectedItem.value}</div>
        </button>
        <div
          className={`absolute w-full left-0 top-[calc(100%+2px)] bg-white rounded-[10px] flex flex-col justify-center items-center transition-all select-none cursor-pointer`}
          style={{
            visibility: `${isSelectorOpen ? "visible" : "hidden"}`,
            opacity: `${isSelectorOpen ? "100%" : "0"}`,
          }}
        >
          {items.map((item, index) => (
            <div
              onClick={() => handleOnItemClick(index)}
              className="flex justify-center items-center py-4 gap-2 transition-all duration-300 border-t first:border-t-0 w-full group"
              key={item.id}
            >
              <div className="w-3 h-3 flex justify-center items-center group-hover:scale-105 transition-all ease-in-out">
                <img src={item.image} alt={item.value} />
              </div>
              <div className="font-bold text-[10px] group-hover:scale-105 transition-all ease-in-out">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Selector;
