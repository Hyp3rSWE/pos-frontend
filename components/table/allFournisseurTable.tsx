import React, { useState , useRef , useEffect} from "react";
import { clsx } from 'clsx';
import MybuttonSearch from '../buttonSearch/buttonSearch';
import {handleaddFournisseur , getAllFournisseur , getTotaleDepts} from "../../data/fournisseur/Allfournisser";
import {getAllFournisseurInvoices} from "../../data/fournisseur/fournisseur";
import {fournisseursWithPayments} from "@/data/fournisseur/payement";
import {TabsProps , FournisseurType , InvoiceFournisseur , Transaction , InvoiceLineFournisseur} from "../../types/index";


const Tabs: React.FC<TabsProps> = ({ tabs }) => {

  const [activeTab, setActiveTab] = useState(0);
  //all fournisseur
  const [rowsAddinvoice, setRowsAddinvoice] = useState<InvoiceLineFournisseur[]>();
  const [totalDept, setTotalDept] = useState();
  //all fournisseur
  const [rows, setRows] = useState<FournisseurType[]>();
  //oneFournisseur: the products tab
  const [rowsFournisseur, setRowsFournisseur] = useState<InvoiceFournisseur[]>();
  //one fournisseur the payementsTab
  const [rowsFournisseurPayement, setRowsFournisseurPayement] = useState<Transaction[]>();
  //used for to navigate between many fournisseurs and one fournisseur
  const [isFournisseur , setFournisseur] = useState<Boolean>(false);
  // used to display and remove the pop up
  const [displayAddFournisseur , setdisplayAddFournisseur ] = useState<Boolean>(false);
  const [displayAddPayement , setdisplayAddPayement ] = useState<Boolean>(false);
  const [displayAddInvoice , setdisplayAddInvoice ] = useState<Boolean>(false);
  const formRefAddFournisseur = useRef(null);
  const formRefAddInvoice = useRef(null);
  const formRefAddPayement = useRef(null);

  const handleSearchFournisseur = async (productName: string) => {
    const normalizedSearch = productName.trim().toLowerCase();
    var allFournisseur = await getAllFournisseur();
    const newrows = allFournisseur?.filter((four: { supplier_name: string; supplier_phone: string; }) => 
      four.supplier_name.toLowerCase().includes(normalizedSearch)||
      four.supplier_phone.includes(normalizedSearch)
    );
    setRows(newrows);
  };

  const handleAddInvoice = async (formRef: any) => {
    var newrows:InvoiceLineFournisseur[] | undefined = rowsAddinvoice? [...rowsAddinvoice]:[];
    const formData = new FormData(formRef.current);
    var Data = Object.fromEntries(formData.entries());  
    var newProduct:InvoiceLineFournisseur = {
      product_barcode:  Data.product_barcode.toString(),
      invoice_sup_line_price:  Number(Data.invoice_sup_line_price),
      product_name: "",
      invoice_sup_line_quantity: Number(Data.invoice_sup_line_quantity),
      product_total: Number(Data.invoice_sup_line_price) * Number(Data.invoice_sup_line_quantity),

    } 

    newrows.push(newProduct)
    setRowsAddinvoice(newrows);
    formRef.current.reset();
  };


  useEffect( () =>  {
    const fetchData = async () => {
      try {
        var total = await getTotaleDepts()
        setTotalDept(total["total-supplier-debt"])
        var allFournisseur = await getAllFournisseur(); // Fetch data
        setRows(allFournisseur); 
        // Update state
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchData();
  }, []);



    const totalDepts = rows?.reduce((sum, row) => sum + row.supplier_debt , 0);//all fournisseur depts
    //all the fournisseurs table
    if(!isFournisseur){
        return   (
            <div className="w-full p-4">
            {//the total depts text field
            }
        <div className="flex justify-end items-center mb-4">
          {
            //add fournisseur pop up
          }
        <div className={clsx('',
                "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center",
                !displayAddFournisseur && "hidden"
              )}>
                <form  ref = {formRefAddFournisseur}
                onSubmit={()=>{}} className="flex justify-center items-center w-full">
                <div className="w-1/2 bg-white rounded-2xl flex-col">
        
                  <div className={clsx("text-center text-4xl p-3 ",!displayAddFournisseur && "hidden")}
                  >Please enter the information of the added fournisseur</div>
        
                  <div className={clsx("p-5 w-full",!displayAddFournisseur && "hidden")}>
                    <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Fournisseur Name:</div><input name="supplier_name" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
                    <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Fournisseur phone number:</div><input name="supplier_phone"type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
                    <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Depts:</div><input name = "supplier_debt" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>
        
                  </div>
        
                  <div className="flex justify-center p-3">
                    <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                    !displayAddFournisseur && "hidden"
                    )}
                    
                     onClick={()=>{
                      handleaddFournisseur(formRefAddFournisseur);
                     }} type="submit">Add</button>
                    <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                    !displayAddFournisseur && "hidden")} onClick={(e)=>{
                      e.preventDefault();
                      setdisplayAddFournisseur(false);

                    }}>Cancel</button>
                  </div>
                </div>
                </form>
              </div>
         <span className="text-6xl font-bold mr-10">Total depts:</span>
         <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
            {totalDepts?.toFixed(2)}
         </span>
        </div>
            {
                //add manually field change it to add quantity... and add product
            }
            <div className="flex justify-between w-full pt-4 pb-4">
              <div>
              <button
                className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
                onClick={()=>{
                  setdisplayAddFournisseur(true);
                }}
              >
                add fournisseur
              </button> 
              </div>
                <MybuttonSearch textValue="" buttonText="Rechercher" placeholderText="le fournisseur / son n° de téléphone"
                onButtonClick={handleSearchFournisseur}
                Downkey="Enter"
                />
            </div>        
              {/**table */}
        <div className="">
        <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3">
        <div className="basis-1/3 flex align-middle justify-center"><div className="font-bold">Nom</div></div>
        <div className="basis-1/3 flex align-middle justify-center"><div className="font-bold">Numéro de téléphone</div></div>
        <div className="basis-1/3 flex align-middle justify-center"><div className="font-bold">depts</div></div>
        </div>
        <div className="h-2"></div>
        <div className="pl-3 pb-2 pr-0 pt-2 bg-[#EBEBEB] rounded-2xl w-full max-h-72 overflow-y-scroll">

        
          {//rows for all the fournisseur
}
          {rows?.map((row, index) => (
            <div>
            <div key={index} className="text-center flex pt-2 pb-2 mt-1 mb-1 hover:bg-[#cac9c9]"
            onClick={async ()=> {
              var oneFourniData = await getAllFournisseurInvoices(row.supplier_id);
                setRowsFournisseur(oneFourniData);
                setRowsFournisseurPayement(fournisseursWithPayments.find((fournisseur)=>fournisseur.Name === row.supplier_name)?.transactions);
                setFournisseur(true);}}>
              {//Name
              }
              <div className={clsx(
                "basis-1/3 flex align-middle justify-center",
              )}
              >
                <div>{row.supplier_name}</div></div>    
              {
                //Phone number
              }
              <div className="basis-1/3 flex align-middle justify-center">
                {
                  row.supplier_phone
                }
                </div>
              {
                //Depts
              }
              <div className="basis-1/3 flex align-middle justify-center">
                {
                  row.supplier_debt
                }
                </div> 
               </div>      
              </div>))}  
        </div>
        </div>
            </div>);}



    //one fournisseur page
    else{
        return (
            <div className="w-full p-4">
          {
            //add payement pop up
          }
        <div className={clsx('',
                "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center",
                !displayAddPayement && "hidden"
              )}>
                <form  ref = {formRefAddPayement}
                onSubmit={()=>{}} className="flex justify-center items-center w-full">
                <div className="w-1/2 bg-white rounded-2xl flex-col">
        
                  <div className={clsx("text-center text-4xl p-3 ",!displayAddPayement && "hidden")}
                  >Please enter the information of the payement</div>
        
                  <div className={clsx("p-5 w-full",!displayAddPayement && "hidden")}>
                    <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Amount:</div><input name="supplier_name" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>        
                  </div>
        
                  <div className="flex justify-center p-3">
                    <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                    !displayAddPayement && "hidden"
                    )}
                    
                     onClick={()=>{
                      
                     }} type="submit">Add</button>
                    <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                    !displayAddPayement && "hidden")} onClick={(e)=>{
                      e.preventDefault();
                      setdisplayAddPayement(false);
                    }}>Cancel</button>
                  </div>
                </div>
                </form>
              </div>

              {
            //add payement pop up
          }
        <div className={clsx('',
                "fixed inset-0 bg-black bg-opacity-50 items-center z-50 flex justify-center",
                !displayAddInvoice && "hidden"
              )}>
                <form  ref = {formRefAddInvoice}
                onSubmit={()=>{}} className="flex justify-center items-center w-full">
                <div className="w-1/2 bg-white rounded-2xl flex-col max-h-[85vh] overflow-y-scroll">
        
                  <div className={clsx("text-center text-4xl p-3 ",!displayAddInvoice && "hidden")}
                  >Please enter the information of the invoice</div>
                  <div className={clsx("p-5 w-full",!displayAddInvoice && "hidden")}>
                    <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Code:</div><input name="product_barcode" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>        
                    <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Quantity:</div><input name="invoice_sup_line_quantity" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>        
                    <div className="w-full flex justify-evenly"><div className="m-1 text-2xl w-1/2">Fournisseur Price:</div><input name="invoice_sup_line_price" type="text" className="m-1 border-2 border-gray-300 rounded-lg p-0.5 w-1/2"/></div>  
                    <div className="flex justify-end">
                    <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                    !displayAddInvoice && "hidden"
                    )}
                    
                     onClick={(e)=>{
                      e.preventDefault();
                      handleAddInvoice(formRefAddInvoice);
                     }} >Add Product</button>

                    </div>
                    <div className="h-2"></div>



                    <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3">
                    <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Code</div></div>
                    <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Produit</div></div>
                    <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Prix unité fournisseur</div></div>
                    <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Quantité</div></div>
                    <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Prix totale</div></div>
                    </div> 
                    <div className="h-2"></div>
                    <div className="w-full max-h-72 overflow-y-scroll">
                    {rowsFournisseur?.map((rowFour, index) => (
                    <div>
                    <div className="rounded-2xl bg-[#EBEBEB]">
                    {
                        rowsAddinvoice?.map((invoiceLine) => (<div 
                            key={index}
                            className={clsx(
                            "text-center w-full flex pt-2 pb-2",
                          )}>
                {//Product Code
                  }
                  <div className="basis-1/5 flex align-middle justify-center">
                      {invoiceLine.product_barcode}
                    </div>
                {//unitPrice
                  }
                  <div className="basis-1/5 flex align-middle justify-center">
                      {invoiceLine.invoice_sup_line_price}
                    </div>

                {//quantity
                  }
                  <div className="basis-1/5 flex align-middle justify-center">
                      {invoiceLine.invoice_sup_line_quantity}
                    </div>

                {//total
                  }
                  <div className="basis-1/5 flex align-middle justify-center">
                      {(invoiceLine.product_total.toFixed(2))}
                    </div>


                        </div>))
                    }
                    </div>
                      </div>
                  
                  ))}  
                
                
                </div>


             
                  </div>
        
                  <div className="flex justify-center p-3">
                    <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                    !displayAddInvoice && "hidden"
                    )}
                    
                     onClick={()=>{
                      
                     }} type="submit">Add</button>
                    <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                    !displayAddInvoice && "hidden")} onClick={(e)=>{
                      e.preventDefault();
                      setRowsAddinvoice([]);
                      setdisplayAddInvoice(false);
                    }}>Cancel</button>
                  </div>
                </div>
                </form>
              </div>

        {//the total depts for that fournisseur text field
        }
        <div className="flex justify-end items-center mb-4">
         <span className="text-6xl font-bold mr-10">Total depts:</span>
         <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
            {totalDepts?.toFixed(2)}
         </span>
        </div>
            <div className="flex justify-between w-full pt-4 pb-4">
              <div>
              <button
                className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
                onClick={()=>{setFournisseur(false)}}
              >
                go back to all fournisseurs
              </button> 
              </div>
                <MybuttonSearch textValue="" buttonText="Rechercher" placeholderText="date / produit"
                onButtonClick={()=>{}}
                Downkey="Enter"
                />
            </div>        
              {/* Tabs Navigation */
              <div className="flex space-x-6 border-b border-gray-300 p-4">
        
                {tabs.map((tab, index) => (
                  <button
                    className={`relative pb-2 text-lg font-medium ${
                      activeTab === index ? "text-blue-900" : "text-gray-500"
                    }`}
                    onClick={() => {setActiveTab(index)}
                    }
                  >
                    {tab.label}
                    {activeTab === index && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-900"></span>
                    )}
                  </button>
                ))}
        
              </div>
              
              }
              {/**table */}
              {//wch hed div
              }
        {activeTab == 0?
        <div className="">
            <div className="flex w-full justify-end">
            <button
              className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1 mb-2"
              onClick={()=>{
                setdisplayAddInvoice(true);
              }}
            >
              Add invoice
            </button> 
            </div>

        <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3">
        <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Code</div></div>
        <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Produit</div></div>
        <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Prix unité fournisseur</div></div>
        <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Quantité</div></div>
        <div className="basis-1/5 flex align-middle justify-center"><div className="font-bold">Prix totale</div></div>
        </div>
        <div className="h-2"></div>

        <div className="w-full max-h-72 overflow-y-scroll">
          {rowsFournisseur?.map((rowFour, index) => (
            <div>

            {//the row of the date

            }
            <div key={index} className="text-center font-bold flex pt-2 pb-2 mt-1 mb-1 bg-white">
            {new Date(rowFour.invoice_sup_timestamp.toString()).toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
              timeZone: "UTC",})}
            </div>


            <div className="rounded-2xl bg-[#EBEBEB]">

            {//the rows of each product
            }
            {
                

                rowFour.invoiceLines.map((product) => (<div 
                    key={index}
                    className={clsx(
                    "text-center w-full flex pt-2 pb-2",
                  )}>
                    {//product.productCode
                    }

        {//Product Code
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.product_barcode}
            </div>
        {//Product Name
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.product_name}
            </div>

        {//unitPrice
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.invoice_sup_line_price}
            </div>

        {//quantity
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.invoice_sup_line_quantity}
            </div>

        {//total
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {(product.product_total.toFixed(2))}
            </div>


                </div>))
            }

            <div className="flex w-full justify-start">
                <div className="bg-[#BEE7DB]  rounded-2xl ml-5 p-2 mb-1">
                   
                totale: {
                    rowFour.invoice_sup_total_amount.toFixed(2)
                }
                </div>

               
            </div>
            </div>
              </div>
           
          ))}  
        
        
        </div>
        </div>


        :
        <div>
          <div className="flex w-full justify-end">
              <button
                className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1 mb-2"
                onClick={()=>{
                  setdisplayAddPayement(true);
                }}
              >
                Add Payement
              </button> 
              </div>
          <div className="">
        
        <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3">
        <div className="basis-1/3 flex align-middle justify-center"><div className="font-bold">Date</div></div>
        <div className="basis-1/3 flex align-middle justify-center"><div className="font-bold">Payement amount</div></div>
        </div>
        
        <div className="h-2"></div>
        
        <div className="pl-3 pb-2 pr-0 pt-2 bg-[#EBEBEB] rounded-2xl w-full max-h-72 overflow-y-scroll">
          {rowsFournisseurPayement?.map((row, index) => (
        
            <div>
            <div key={index} className="text-center flex pt-2 pb-2 mt-1 mb-1">        
              {
                //Date
              }
              <div className={clsx(
                "basis-1/3 flex align-middle justify-center",
              )}
              >
                <div>{
                row.date
                  }</div></div>
              {
                //amount paid
              }
              <div className="basis-1/3 flex align-middle justify-center">
                {
                  row.amountPaid
                }
                </div>
               </div>      
              </div>
          ))}  
        </div>
        </div>
        </div>
          
        }
            </div>
        )
    }

};

export default Tabs;