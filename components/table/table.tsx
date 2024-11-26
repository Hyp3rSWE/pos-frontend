import React, { useState } from "react";
import { clsx } from 'clsx';

interface ProductRow {
  code: string;
  product: string;
  quantity: number;
  unitPrice: number;
}


const ProductTable: React.FC = () => {
  const [rows, setRows] = useState<ProductRow[]>([
    { code: "12345678910", product: "Thon", quantity: 12, unitPrice: 100 },
    { code: "12345678910", product: "Thon", quantity: 12, unitPrice: 100 },
  ]);



  const handleQuantityChange = (index: number, value: number) => {
    const updatedRows = [...rows];
    updatedRows[index].quantity = value;
    setRows(updatedRows);
  };



  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const totalAmount = rows.reduce((sum, row) => sum + row.quantity * row.unitPrice, 0);

  return (
    <div className="p-4">

        <div className="flex justify-end items-center mb-4">
         <span className="text-6xl font-bold mr-10">Totale:</span>
         <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
    {totalAmount.toFixed(2)}
         </span>
        </div>

      <table className="table-auto w-full">
        <thead className="bg-[#BEE7DB]">
          <tr className="">
            <th className="px-4 py-2 rounded-tl-3xl rounded-bl-3xl">Code</th>
            <th className="  px-4 py-2">Produit</th>
            <th className="  px-4 py-2">Quantité</th>
            <th className="  px-4 py-2">Prix unitaire</th>
            <th className="  px-4 py-2">Prix total</th>
            <th className="px-4 py-2 rounded-tr-3xl rounded-br-3xl">Actions</th>
          </tr>
        </thead>
        <br></br>

        <tbody className="">

          {rows.map((row, index) => (
            <tr key={index} className="text-center">
              <td className={clsx(
                "bg-[#EBEBEB] px-4 py-2",
                index === 0 ? "rounded-tl-2xl" : "",
                index === rows.length - 1 ? "rounded-bl-2xl" : ""
              )}
              >{row.code}</td>
              <td className="bg-[#EBEBEB]  px-4 py-2">{row.product}</td>
              <td className="bg-[#EBEBEB]  px-4 py-2">
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="bg-[#EBEBEB]  px-4 py-2">{row.unitPrice}</td>
              <td className="bg-[#EBEBEB]  px-4 py-2">{row.quantity * row.unitPrice}</td>
              <td className={clsx(
                "bg-[#EBEBEB] px-4 py-2",
                index === 0 ? "rounded-tr-2xl" : "",
                index === rows.length - 1 ? "rounded-br-2xl" : ""
              )}>
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="text-white px-2 py-1 rounded"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}


          
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">Total: {totalAmount.toFixed(2)}</span>
        <button className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl">Valider</button>
      </div>
    </div>
  );
};

export default ProductTable;

