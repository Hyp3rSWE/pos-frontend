import React, { useState } from "react";

interface ProductInputProps {
  buttonText: string;
  placeholderText: string;
  Downkey:string;
  textValue : string;
  onButtonClick: (inputValue: string) => void;
}

const ProductInput: React.FC<ProductInputProps> = ({
  buttonText,
  placeholderText,
  textValue,
  Downkey,

  onButtonClick,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    textValue = inputValue
    onButtonClick(textValue);
    setInputValue(""); 
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    console.log(" a key was pressed")
    console.log(e.key)
    console.log(Downkey)
    if(e.key === Downkey){
      console.log("hye")
      textValue = inputValue
      onButtonClick(textValue);
      setInputValue(""); 
    }


  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"

        value={inputValue}
        onChange={(e) => 
            setInputValue(e.target.value)
        }
        placeholder={placeholderText}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:bg-[#BEE7DB]"
        onKeyDown={(e)=>handleKeyDown(e)}
      />
      <button
        onClick={handleButtonClick}
        className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ProductInput;
