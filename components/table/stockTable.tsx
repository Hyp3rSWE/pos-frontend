import React, { useState , useEffect , useRef} from "react";
import { clsx } from 'clsx';
import MybuttonSearch from '../buttonSearch/buttonSearch';
import { TiDelete } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import {ProductRow , TabsProps} from "../../types/index";
import {getAllProduct , handleaddProduct , DeleteProduct , getTotaleStock , UpdateProductPrice} from "../../data/stock/allProducts";
import AdjustQuantityModal from '../AdjustQuantityModal'
import { toast } from 'react-hot-toast';

interface Supplier {
  supplier_id: number;
  supplier_name: string;
  supplier_phone: string;
  supplier_debt: number;
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const [isEditable, setEditable] = useState(false); //for the quantity
  const [EditIndex, setEditIndex] = useState(-1); //for the quantity as well
  const [totalStock, setTotalStock] = useState(-1); //for the quantity as well
  const [rows, setRows] = useState<ProductRow[]>();//initially display them all
  var allProducts :ProductRow[]|undefined ;
  const [AddProductpopup, setAddProductpopup] = useState<boolean>(false); 
  const [DeleteUpdateID, setDeleteUpdateID] = useState<string>(""); 
  const [UpdatePrice, setUpdatePrice] = useState<number>(-1); 
  const [DeleteProductpopup, setDeleteProductpopup] = useState<boolean>(false); 
  const [AddQuantitypopup, setAddQuantitypopup] = useState<boolean>(false); 
  const [SavePricepopup, setSavePricepopup] = useState<boolean>(false); 
  const formRefAddProduct = useRef(null);
  const [adjustQuantityModal, setAdjustQuantityModal] = useState<boolean>(false);
  const [gros, setgros] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect( () =>  {
    const fetchData = async () => {
      try {
        var total = await getTotaleStock();
        console.log("totale" , total);
        setTotalStock(Number(total.totalStock));
        allProducts = await getAllProduct(); // Fetch data
        setRows(allProducts); 
        // Update state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:3001/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleKeyDownForm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key press
    }
  };


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
      product.product.toLowerCase().includes(normalizedSearch)||
      product.code == normalizedSearch
    );
    setRows(newrows);
  };

  const handleAdjustQuantity = async () => {
    try {
      if (!selectedProduct) return;

      const response = await fetch(`http://localhost:3001/adjustments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: selectedProduct.productid,
          new_quantity: newQuantity,
          reason: adjustmentReason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to adjust quantity');
      }

      // Refresh the product list
      const updatedProducts = await getAllProduct();
      setRows(updatedProducts);
      
      // Update total stock
      const total = await getTotaleStock();
      setTotalStock(Number(total.totalStock));

      toast.success('Quantity adjusted successfully');
      setAdjustQuantityModal(false);
    } catch (error) {
      console.error('Error adjusting quantity:', error);
      toast.error('Failed to adjust quantity');
    }
  };

  return (
    
    <div className="w-full">
{//the pop up of adding a productt
}
<div className={clsx('',
        AddProductpopup && "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center align-middle"
      )}>
        <form  ref={formRefAddProduct} onSubmit={()=>{handleaddProduct(formRefAddProduct,gros)}} className="flex justify-center items-center">
        <div className="w-3/4  bg-white rounded-2xl flex-col max-h-screen overflow-y-auto">

          <div className={clsx("text-center text-4xl p-3 ",!AddProductpopup && "hidden")}
          >Please enter the information of the added product</div>

          <div className={clsx("p-5 w-full",!AddProductpopup&&"hidden")}>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product Code:</div><input name = "product_barcode" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Supplier:</div><select 
              name="supplier_id" 
              className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.supplier_id} value={supplier.supplier_id}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product Name:</div><input name="product_name" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product quantity:</div><input name="product_stock_level"type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product unit price:</div><input name = "product_price" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product cost:</div><input name = "product_cost" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>
            <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product gros:</div><input type="checkbox" checked={gros} onChange={()=>{setgros(!gros)}}  className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>
            <div className={clsx("w-full flex justify-evenly",!gros&&"hidden")}><div className="m-1 text-2xl w-1/2">Product unité Code:</div><input name = "product_barcode_for_variant" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>
            <div className={clsx("w-full flex justify-evenly",!gros&&"hidden")}><div className="m-1 text-2xl w-1/2">Product unité quantity in package:</div><input name = "product_quantity_for_variant" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2" onKeyDown={handleKeyDownForm}/></div>


          </div>

          <div className="flex justify-center p-3">
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !AddProductpopup&&"hidden"
            )}
            
             onClick={()=>{setAddProductpopup(false)
              setgros(false)
             }} type="submit">Add</button>
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !AddProductpopup&&"hidden")} onClick={(e)=>{setAddProductpopup(false);
              e.preventDefault();
              setgros(false);
            }
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
          <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product old cost:</div><input type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
          <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Product new cost:</div><input type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
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
             onClick={ async () =>{setSavePricepopup(false)
             await UpdateProductPrice(DeleteUpdateID,UpdatePrice);
             setDeleteUpdateID("");
             setUpdatePrice(-1);
            }}
             
             >Yes</button>
            <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
            !SavePricepopup&&"hidden")} onClick={()=>setSavePricepopup(false)}>Cancel</button>
          </div>
        </div>
      </div>

{//the pop up of deleting the record
}
<form className={clsx('',
        DeleteProductpopup && "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center align-middle"
      )} onSubmit={()=>{handleDeleteRow(DeleteUpdateID)}}>

      <div className="w-1/2 bg-white rounded-2xl flex-col">

<div className={clsx("text-center text-4xl p-3 ",!DeleteProductpopup && "hidden")}
>Are you sure you want to delete this product ?</div>
<div className={clsx("p-5 w-full",!DeleteProductpopup&&"hidden")}>
</div>
<div className="flex justify-center p-3">
  <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
  !DeleteProductpopup&&"hidden")}
   onClick={()=>{setDeleteProductpopup(false)
   }} type="submit">Yes</button>
  <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
  !DeleteProductpopup&&"hidden")} onClick={()=>{setDeleteProductpopup(false)
    setDeleteUpdateID("")}}>Cancel</button>
</div>
</div>

{// Add the Adjust Quantity Modal
}
<AdjustQuantityModal
  isOpen={adjustQuantityModal}
  closeModal={() => {
    setAdjustQuantityModal(false);
    setSelectedProduct(null);
  }}
  productId={Number(selectedProduct?.productid) ?? 0}
  productName={selectedProduct?.product ?? ''}
  currentQuantity={selectedProduct?.quantity ?? 0}
  onQuantityAdjusted={async () => {
    // Refresh the product list
    const updatedProducts = await getAllProduct();
    setRows(updatedProducts);
    
    // Update total stock
    const total = await getTotaleStock();
    setTotalStock(Number(total.totalStock));
  }}
/>

    


      </form>
    <div>
    <div className="flex justify-end items-center mr-4 -mt-10">
         <span className="text-6xl font-bold mr-10">Totale Stock:</span>
         <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
    {totalStock.toFixed(2)}
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
        <MybuttonSearch textValue="" buttonText="Rechercher" placeholderText="le nom / le code du produit"
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
            setDeleteUpdateID(row.productid)}}
          className="text-white px-2 py-1 rounded"
        >
          <TiDelete className="text-red-500 text-3xl hover:text-red-800"></TiDelete>
        </button>

        <button
          onClick={()=>{handleEditPrice(index);
            (isEditable && index == EditIndex)?setSavePricepopup(true):()=>{}
            setDeleteUpdateID(row.productid);
            setUpdatePrice(row.unitPrice);
          }}
          className="text-white px-2 py-1 rounded"
        >
          {isEditable && index == EditIndex?
          <IoIosSave className="text-green-500 text-2xl hover:text-green-900"></IoIosSave>:
          <FaPencilAlt className="text-black text-2xl hover:text-gray-500"></FaPencilAlt>
          }
          
        </button>

        <button
          onClick={() => {
            setSelectedProduct(row);
            setAdjustQuantityModal(true);
          }}
          className="text-white px-2 py-1 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 hover:text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
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
