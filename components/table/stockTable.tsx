import React, { useState , useRef , useEffect} from "react";
import { clsx } from 'clsx';
import MybuttonSearch from '../buttonSearch/buttonSearch';
import { TiDelete } from "react-icons/ti";


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
    <div className="flex justify-end w-full p-4">
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


<div className="w-full max-h-72 overflow-y-scroll relative">

    
<table className="table-auto w-full ">

<thead className="bg-[#BEE7DB] sticky top-0 z-10">
  <tr className="">
    <th className="px-4 py-2 rounded-tl-xl rounded-bl-xl">Code</th>
    <th className="  px-4 py-2">Produit</th>
    <th className="  px-4 py-2">Quantité</th>
    <th className="  px-4 py-2">Prix unitaire</th>
    <th className="px-4 py-2 rounded-tr-xl rounded-br-xl">Actions</th>
  </tr>

</thead>
<thead className="bg-white sticky top-10 z-10 h-1">
  <tr className="">
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
  </tr>
</thead>


<tbody className="">


  {rows.map((row, index) => (


    <tr key={index} className="text-center">

      {
        //code
      }
      <td className={clsx(
        "bg-[#EBEBEB] px-4 py-2",
        index === 0 ? "rounded-tl-lg" : "",
        index === rows.length - 1 ? "rounded-bl-lg" : ""
      )}
      >{row.code}</td>

      {
        //product
      }
      <td className="bg-[#EBEBEB]  px-4 py-2">{row.product}</td>


      {
        //quantity
      }
      <td className= {clsx("bg-[#EBEBEB]  px-4 py-2",
          index == rows.length - 1 ? "bg-[#BEE7DB]" : ""
        )}>{row.quantity}</td>

      {
        //unit price
      }
      <td className="bg-[#EBEBEB]  px-4 py-2">{row.unitPrice}</td>

      {
        //delete button add the ability to use a shorcut
      }
      <td className={clsx(
        "bg-[#EBEBEB] px-4 py-2",
      )}>
        <button
          onClick={() => handleDeleteRow(index)}
          className="text-white px-2 py-1 rounded"
        >
          <TiDelete className="text-red-500 text-3xl hover:text-red-800"></TiDelete>
        </button>
      </td>


    </tr>
  ))}  
</tbody>
</table>
</div>
</div>







    </div>
  );
};

export default Tabs;
