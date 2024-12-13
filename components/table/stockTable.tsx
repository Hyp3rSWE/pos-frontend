import React, { useState , useEffect , useRef} from "react";
import { clsx } from 'clsx';
import MybuttonSearch from '../buttonSearch/buttonSearch';
import { TiDelete } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import {ProductRow , TabsProps} from "../../types/index";
import {getAllProduct , handleaddProduct , DeleteProduct} from "../../data/stock/allProducts";



const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const [isEditable, setEditable] = useState(false); //for the quantity
  const [EditIndex, setEditIndex] = useState(-1); //for the quantity as well
  const [rows, setRows] = useState<ProductRow[]>();//initially display them all
  var allProducts :ProductRow[]|undefined ;
  const [AddProductpopup, setAddProductpopup] = useState<boolean>(false); 
  const [DeleteID, setDeleteID] = useState<string>(""); 
  const [DeleteProductpopup, setDeleteProductpopup] = useState<boolean>(false); 
  const [AddQuantitypopup, setAddQuantitypopup] = useState<boolean>(false); 
  const [SavePricepopup, setSavePricepopup] = useState<boolean>(false); 
  const formRefAddProduct = useRef(null);

  useEffect( () =>  {
    console.log("Effect ran on mount");
    const fetchData = async () => {
      try {
        allProducts = await getAllProduct(); // Fetch data
        console.log(allProducts);
        setRows(allProducts); 
        // Update state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);


  const handleDeleteRow = async (ID: string) => {
    await DeleteProduct(ID);
    const updatedRows = rows
    setRows(updatedRows);
  };

  const handlePriceyChange = (index: number, value: number) => {
    const updatedRows = [...(rows??[])];
    updatedRows[index].unitPrice = value;
    setRows(updatedRows);
  };

  const handleEditPrice = (index: number) => {
      setEditable(!isEditable)
      setEditIndex(index)
  }

  const filterReptureStock = async() => {
    allProducts = await getAllProduct();
    const updatedRows = allProducts?.filter(product => product.quantity < 10);
    setRows(updatedRows);
  }

  const filterThresholdStock = async () => {
    allProducts = await getAllProduct();
    const updatedRows = allProducts?.filter(product => product.quantity == 0);
    setRows(updatedRows);
  }
  const NoFilterStock = async () => {
    allProducts = await getAllProduct();
    const updatedRows = allProducts;
    console.log("no filter: " + allProducts);
    setRows(updatedRows);
  }

  //looking for the product in the "product codes to add it"
  //change that one... 
  const handleSearchProduct = async (productName: string) => {
    const normalizedSearch = productName.trim().toLowerCase();
    allProducts = await getAllProduct();
    const newrows = allProducts?.filter(product => 
      product.product.toLowerCase().includes(normalizedSearch)
    );
    setRows(newrows);
  };

  return (
    
    <div className="w-full">
{//the pop up of adding a product
}
<div className={clsx('',
        AddProductpopup && "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center align-middle"
      )}>
        <form  ref={formRefAddProduct} onSubmit={()=>{handleaddProduct(formRefAddProduct)}} className="flex justify-center items-center">
        <div className="w-1/2 bg-white rounded-2xl flex-col">

          <div className={clsx("text-center text-4xl p-3 ",!AddProductpopup && "hidden")}
          >Please enter the information of the added product</div>

          <div className={clsx("p-5 w-full",!AddProductpopup&&"hidden")}>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product Code:</div><input name = "product_barcode" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product Name:</div><input name="product_name" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product quantity:</div><input name="product_stock_level"type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product unit price:</div><input name = "product_price" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>

          </div>

          <div className="flex justify-center p-3">
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !AddProductpopup&&"hidden"
            )}
            
             onClick={()=>setAddProductpopup(false)} type="submit">Add</button>
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !AddProductpopup&&"hidden")} onClick={(e)=>{setAddProductpopup(false);
              e.preventDefault();}
            }>Cancel</button>
          </div>
        </div>
        </form>
      </div>

{//the pop up of adding a quantity
}
<div className={clsx('',
        AddQuantitypopup && "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center align-middle"
      )}>
        <div className="w-1/2 bg-white rounded-2xl flex-col">

          <div className={clsx("text-center text-4xl p-3 ",!AddQuantitypopup && "hidden")}
          >Please enter the quantity of the product you want to add</div>

          <div className={clsx("p-5 w-full",!AddQuantitypopup&&"hidden")}>
          <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product quantity:</div><input type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
          <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product code:</div><input type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
          </div>

          <div className="flex justify-center p-3">
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !AddQuantitypopup&&"hidden")}
             onClick={()=>setAddQuantitypopup(false)}>Add</button>
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !AddQuantitypopup&&"hidden")} onClick={()=>setAddQuantitypopup(false)}>Cancel</button>
          </div>
        </div>
      </div>

{//the pop up of saving the price
}
<div className={clsx('',
        SavePricepopup && "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center align-middle"
      )}>
        <div className="w-1/2 bg-white rounded-2xl flex-col">

          <div className={clsx("text-center text-4xl p-3 ",!SavePricepopup && "hidden")}
          >Are you sure you want to perform this operation ?</div>
          <div className={clsx("p-5 w-full",!AddQuantitypopup&&"hidden")}>
          </div>

          <div className="flex justify-center p-3">
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !SavePricepopup&&"hidden")}
             onClick={()=>setSavePricepopup(false)}>Yes</button>
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !SavePricepopup&&"hidden")} onClick={()=>setSavePricepopup(false)}>Cancel</button>
          </div>
        </div>
      </div>

{//the pop up of deleting the record
}
<div className={clsx('',
        DeleteProductpopup && "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center align-middle"
      )}>

      <div className="w-1/2 bg-white rounded-2xl flex-col">

<div className={clsx("text-center text-4xl p-3 ",!DeleteProductpopup && "hidden")}
>Are you sure you want to delete this product ?</div>
<div className={clsx("p-5 w-full",!DeleteProductpopup&&"hidden")}>
</div>
<div className="flex justify-center p-3">
  <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
  !DeleteProductpopup&&"hidden")}
   onClick={()=>{setDeleteProductpopup(false)
    handleDeleteRow(DeleteID)
   }}>Yes</button>
  <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
  !DeleteProductpopup&&"hidden")} onClick={()=>{setDeleteProductpopup(false)
    setDeleteID("")}}>Cancel</button>
</div>
</div>

    


      </div>
    <div>
    <div className="flex justify-end items-center mr-4 -mt-10">
         <span className="text-6xl font-bold mr-10">Totale Stock:</span>
         <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
    {-1}
         </span>
        </div>
    <div className="flex justify-between w-full p-4">
      <div>
      <button
        className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
        onClick={()=>setAddProductpopup(true)}>
        add product
      </button>
      <button
        className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
        onClick={()=>setAddQuantitypopup(true)}
      >add quantity
        </button>   
      </div>
        <MybuttonSearch textValue="" buttonText="Rechercher" placeholderText="le nom du produit"
        onButtonClick={handleSearchProduct}
        Downkey="Enter"
        />
    </div></div>

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

  
  {rows?.map((row, index) => (


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
          onClick={() => {setDeleteProductpopup(true) 
            setDeleteID(row.productid)}}
          className="text-white px-2 py-1 rounded"
        >
          <TiDelete className="text-red-500 text-3xl hover:text-red-800"></TiDelete>
        </button>

        <button
          onClick={()=>{handleEditPrice(index);
            (isEditable && index == EditIndex)?setSavePricepopup(true):()=>{}}}
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
