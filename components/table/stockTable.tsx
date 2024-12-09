import React, { useState} from "react";
import { clsx } from 'clsx';
import MybuttonSearch from '../buttonSearch/buttonSearch';
import { TiDelete } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";


interface ProductRow {
  code: string;
  product: string;
  quantity: number;
  unitPrice: number;
}

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}


const Tabs: React.FC<TabsProps> = ({ tabs }) => {

  const [activeTab, setActiveTab] = useState(0);
  const [isEditable, setEditable] = useState(false);
  const [EditIndex, setEditIndex] = useState(-1);

  //use the get All end point later on
  const specialCodesProducts: ProductRow[] = [
    { code: "1", product: "Bread", quantity: 10, unitPrice: 1.5 },
    { code: "2", product: "Eggs", quantity: 12, unitPrice: 0.2 },
    { code: "3", product: "Milk", quantity: 8, unitPrice: 1.2 },
    { code: "4", product: "Apples", quantity: 15, unitPrice: 0.5 },
    { code: "5", product: "Potatoes", quantity: 20, unitPrice: 0.3 },
    { code: "6", product: "Bananas", quantity: 18, unitPrice: 0.6 },
    { code: "7", product: "Cheese", quantity: 5, unitPrice: 2.0 },
    { code: "8", product: "Tomatoes", quantity: 25, unitPrice: 0.4 },
    { code: "9", product: "Carrots", quantity: 30, unitPrice: 0.2 },
    { code: "10", product: "Onions", quantity: 22, unitPrice: 0.25 },
    { code: "11", product: "Chicken", quantity: 7, unitPrice: 3.5 },
    { code: "12", product: "Fish", quantity: 6, unitPrice: 4.0 },
    { code: "13", product: "Butter", quantity: 8, unitPrice: 2.5 },
    { code: "14", product: "Yogurt", quantity: 10, unitPrice: 1.0 },
    { code: "15", product: "Pasta", quantity: 15, unitPrice: 0.8 },
    { code: "16", product: "Rice", quantity: 12, unitPrice: 0.7 },
    { code: "17", product: "Flour", quantity: 20, unitPrice: 0.9 },
    { code: "18", product: "Sugar", quantity: 25, unitPrice: 0.5 },
    { code: "19", product: "Salt", quantity: 18, unitPrice: 0.2 },
    { code: "20", product: "Oil", quantity: 5, unitPrice: 5.0 }
  ];

  const [rows, setRows] = useState<ProductRow[]>(specialCodesProducts);


  

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
    
    const updatedRows = specialCodesProducts.filter(product => product.quantity < 10);
    setRows(updatedRows);
  }

  const filterThresholdStock = () => {
    const updatedRows = specialCodesProducts.filter(product => product.quantity == 0);
    setRows(updatedRows);
  }
  const NoFilterStock = () => {
    const updatedRows = specialCodesProducts;
    setRows(updatedRows);
  }

  //looking for the product in the "special codes to add it"
  //change that one... 
  const handleSearchProduct = (productName: string) => {
    const normalizedSearch = productName.trim().toLowerCase();
    const newrows = specialCodesProducts.filter(product => 
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
