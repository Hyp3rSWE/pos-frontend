import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import MybuttonSearch from "../buttonSearch/buttonSearch";
import { TiDelete } from "react-icons/ti";
import { ProductRow } from "../../types/index";
import { getProdByCode, handleAddInvoice } from "../../data/vendre/GetProduct"; //this will probably changes later on...

const ProductTable: React.FC = () => {
  //the rows gets updated after reading value from scanner
  //or using "ajouter un produit" INITIALLY EMPTY
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [focus, setfocus] = useState<boolean>(false); //this boolean I used it to solve the problem of the text being
  //always selected, the text of the quantity will get selected only once after scanning
  const [popup, setpopup] = useState<boolean>(false);
  const [coloredInputIndex, setColoredIndex] = useState<number>(rows.length);
  const changedInputQuantityRef = useRef<HTMLInputElement>(null);
  const AddProductInputRef = useRef<HTMLInputElement>(null);

  const selectAddProductsInputField = (e: any) => {
    console.log("THE FUNCTION IS CALLED");
    if (e.key === " ") {
      console.log("WHY");
      if (AddProductInputRef.current) {
        console.log("IT IS NOT EMPTY");
      }
      AddProductInputRef.current?.focus();
    }
  };

  const handleQuantityChange = (index: number, value: number) => {
    const updatedRows = [...rows];
    if (value >= 1) updatedRows[index].quantity = value;
    else updatedRows[index].quantity = 1;

    setRows(updatedRows);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  //looking for the product in the "product codes to add it" if it is already in the invoice just increment by one

  const handleAddProduct = async (productCode: string) => {
    //
    const newrow: ProductRow | undefined = await getProdByCode(productCode);
    //
    const updateRows = [...rows];
    //if item already exists
    const item = updateRows.find((product) => product.code === productCode);
    const index = updateRows.findIndex(
      (product) => product.code === productCode,
    );
    if (item === undefined) {
      if (newrow !== undefined) {
        updateRows.push(newrow);
        setColoredIndex(rows.length);
        setfocus(true);
      }
    } else {
      item.quantity += 1;
      setColoredIndex(index);
      setfocus(true);
    }
    setRows(updateRows);
  };

  const handleSelectForChange = async () => {
    if (changedInputQuantityRef.current) {
      changedInputQuantityRef.current.focus();
    }
  };

  const totalAmount = rows.reduce(
    (sum, row) => sum + row.quantity * row.unitPrice,
    0,
  );

  return (
    <div className="p-4">
      <div
        className={clsx(
          "",
          popup &&
            "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center align-middle",
        )}
      >
        <div className="w-1/2 bg-white rounded-2xl flex-col">
          <div className={clsx("text-center text-4xl p-3", !popup && "hidden")}>
            Are you sure you want to perform this operation ?
          </div>

          <div className="flex justify-center p-3">
            <button
              className={clsx(
                "bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                !popup && "hidden",
              )}
              onClick={() => setpopup(false)}
            >
              Yes
            </button>
            <button
              className={clsx(
                "bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                !popup && "hidden",
              )}
              onClick={() => setpopup(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {
        //the total text field
      }
      <div className="flex justify-end items-center mb-4">
        <span className="text-6xl font-bold mr-10">Totale:</span>
        <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
          {totalAmount.toFixed(2)}
        </span>
      </div>

      {
        //the ajouter un produit manually field
      }
      <div className="flex justify-end w-full">
        <MybuttonSearch
          textValue=""
          buttonText="Ajouter"
          placeholderText="Ajouter le code de produit"
          onButtonClick={handleAddProduct}
          Downkey="Enter"
          DownKeySelect=" "
          handleKeySelect={handleSelectForChange}
          Ref={AddProductInputRef}
        />
      </div>

      <br></br>

      <div className="w-full">
        <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3">
          <div className="basis-1/6 flex align-middle justify-center">
            <div className="font-bold">Code</div>
          </div>
          <div className="basis-1/6 flex align-middle justify-center">
            <div className="font-bold">Produit</div>
          </div>
          <div className="basis-1/6 flex align-middle justify-center">
            <div className="font-bold">Quantité</div>
          </div>
          <div className="basis-1/6 flex align-middle justify-center">
            <div className="font-bold">Prix unitaire</div>
          </div>
          <div className="basis-1/6 flex align-middle justify-center">
            <div className="font-bold">Prix totale</div>
          </div>
          <div className="basis-1/6 flex align-middle justify-center">
            <div className="font-bold">Actions</div>
          </div>
        </div>

        <div className="h-2"></div>

        <div className=" ">
          <div className="pl-3 pb-2 pr-0 pt-2 bg-[#EBEBEB] rounded-2xl w-full max-h-72 overflow-y-scroll">
            <br></br>

            {rows.map((row, index) => (
              <div key={index} className="text-center flex">
                {
                  //code
                }
                <div
                  className={clsx("basis-1/6 flex align-middle justify-center")}
                >
                  <div>{row.code}</div>
                </div>

                {
                  //product
                }
                <div className="basis-1/6 flex align-middle justify-center">
                  <div>{row.product}</div>
                </div>

                {
                  //quantity
                }
                <div
                  className={clsx("basis-1/6 flex align-middle justify-center")}
                >
                  <input
                    ref={
                      index == coloredInputIndex
                        ? changedInputQuantityRef
                        : null
                    }
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value) || 1)
                    }
                    className={
                      "w-16 p-1 border rounded focus:bg-[#BEE7DB] h-8 text-center"
                    }
                    onKeyDown={(e) => selectAddProductsInputField(e)}
                  />
                </div>

                {
                  //unit proce
                }
                <div className="basis-1/6 flex align-middle justify-center">
                  <div>{row.unitPrice}</div>
                </div>

                {
                  //total of product
                }

                <div className="basis-1/6 flex align-middle justify-center">
                  <div>{(row.quantity * row.unitPrice).toFixed(2)}</div>
                </div>

                {
                  //delete button add the ability to use a shorcut
                }
                <div
                  className={clsx(
                    "basis-1/6 flex align-middle justify-center h-6",
                  )}
                >
                  <button
                    onClick={() => handleDeleteRow(index)}
                    className="text-white rounded"
                  >
                    <TiDelete className="text-red-500 text-3xl hover:text-red-800"></TiDelete>
                  </button>
                </div>

                <br></br>
                <br></br>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button
          className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1"
          onClick={() => {
            setpopup(true);
            handleAddInvoice(rows, totalAmount);
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
