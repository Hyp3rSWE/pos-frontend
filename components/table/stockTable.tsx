import React, { useState} from "react";
import { clsx } from 'clsx';
import MybuttonSearch from '../buttonSearch/buttonSearch';
import { TiDelete } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import {ProductRow , TabsProps} from "../../types/index";
import {AllCodesProducts} from "../../data/stock/allProducts";



const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditable, setEditable] = useState(false); //for the quantity
  const [EditIndex, setEditIndex] = useState(-1); //for the quantity as well
  const [rows, setRows] = useState<ProductRow[]>(AllCodesProducts);//initially display them all


  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handlePriceyChange = (index: number, value: number) => {
    const updatedRows = [...rows];
    updatedRows[index].unitPrice = value;
    setRows(updatedRows);
  };

  const handleEditPrice = (index: number) => {
      setEditable(!isEditable)
      setEditIndex(index)
  }

  const filterReptureStock = () => {
    const updatedRows = AllCodesProducts.filter(product => product.quantity < 10);
    setRows(updatedRows);
  }

  const filterThresholdStock = () => {
    const updatedRows = AllCodesProducts.filter(product => product.quantity == 0);
    setRows(updatedRows);
  }
  const NoFilterStock = () => {
    const updatedRows = AllCodesProducts;
    setRows(updatedRows);
  }

  //looking for the product in the "product codes to add it"
  //change that one... 
  const handleSearchProduct = (productName: string) => {
    const normalizedSearch = productName.trim().toLowerCase();
    const newrows = AllCodesProducts.filter(product => 
      product.product.toLowerCase().includes(normalizedSearch)
    );
    setRows(newrows);
  };

  return (
    
    <div className="w-full">


    {
        //add manually field change it to add quantity... and add product
    }
    <div className="flex justify-between w-full p-4">
      <div>
      <button
        className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
      >
        add product
      </button>
      <button
        className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
      >add quantity
        </button>   
      </div>
        <MybuttonSearch textValue="" buttonText="Rechercher" placeholderText="le nom du produit"
        onButtonClick={handleSearchProduct}
        Downkey="Enter"
        />
    </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-6 border-b border-gray-300 p-4">

        {tabs.map((tab, index) => (
          <button
            className={`relative pb-2 text-lg font-medium ${
              activeTab === index ? "text-blue-900" : "text-gray-500"
            }`}
            onClick={() => {setActiveTab(index)
                console.log(index);
                if(index == 1){
                    filterReptureStock();
                }
                else if(index == 2){
                    filterThresholdStock();
                }
                else{
                    NoFilterStock();
                }

            }
          
            }
          >
            {tab.label}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-900"></span>
            )}
          </button>
        ))}

      </div>

      {/* Tab Content */}


      {/**table */}
  <div className="p-4">

<div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3">
<div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Code</div></div>
<div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Produit</div></div>
<div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Quantité</div></div>
<div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Prix unitaire</div></div>
<div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Actions</div></div>
</div>

<div className="h-2"></div>

<div className="pl-3 pb-2 pr-0 pt-2 bg-[#EBEBEB] rounded-2xl w-full max-h-72 overflow-y-scroll">
<br></br>

  
  {rows.map((row, index) => (


    <div key={index} className="text-center flex">

      {
        //code
      }
      <div className={clsx(
        "basis-1/5 flex align-middle justify-center",
      )}
      >
        <div>{row.code}</div></div>

      {
        //product
      }
      <div className="basis-1/5 flex align-middle justify-center"><div>{row.product}</div></div>


      {
        //quantity
      }
      <div className= "basis-1/5 flex align-middle justify-center"><div>{row.quantity}</div></div>

      {
        //unit price
      }
      <div className="basis-1/5 flex align-middle justify-center">
        {
          (isEditable && EditIndex == index)?<input value={row.unitPrice}
          className="w-16 p-1 border rounded focus:bg-[#BEE7DB] h-8 text-center"
          onChange={(e) => handlePriceyChange(index, parseInt(e.target.value) || 0)}
          ></input>:
          row.unitPrice
        }
        </div>

      {
        //delete and edit buttons add the ability to use a shorcut
      }
      <div className="basis-1/5 flex align-middle justify-center h-8">
        <div className="flex justify-center content-evenly">
        <button
          onClick={() => handleDeleteRow(index)}
          className="text-white px-2 py-1 rounded"
        >
          <TiDelete className="text-red-500 text-3xl hover:text-red-800"></TiDelete>
        </button>

        <button
          onClick={() => handleEditPrice(index)}
          className="text-white px-2 py-1 rounded"
        >
          {isEditable && index == EditIndex?
          <IoIosSave className="text-green-500 text-2xl hover:text-green-900"></IoIosSave>:
          <FaPencilAlt className="text-black text-2xl hover:text-gray-500"></FaPencilAlt>
          }
          
        </button>
        </div>

      </div>

      <br></br>
      <br></br>
    </div>
  ))}  


                                      </div>       
</div>
    </div>
  );
};

export default Tabs;
