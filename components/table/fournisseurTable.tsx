import React, { useState} from "react";
import { clsx } from 'clsx';
import MybuttonSearch from '../buttonSearch/buttonSearch';
import {AllFournisseurData} from "../../data/Allfournisser";
import { inventory } from "@/data/fournisseur";


interface FournisseurRow {
  Name: string;
  PhoneNumber: string;
  Depts: number;
}

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

interface Product {
    unitPrice: number; // Unit price of the product
    productCode: string; // Unique product code
    productName: string; // Name of the product
    quantity: number; // Quantity of the product
  }
  
  // Define the structure for a dated product list
  interface DatedProductList {
    date: string; // Date in ISO format (e.g., "2024-12-09")
    products: Product[]; // List of products for that date
  }


const Tabs: React.FC<TabsProps> = ({ tabs }) => {

  const [activeTab, setActiveTab] = useState(0);
  const [isEditable, setEditable] = useState(false);
  const [EditIndex, setEditIndex] = useState(-1);
  const [rows, setRows] = useState<FournisseurRow[]>(AllFournisseurData);
  const [rowsFournisseur, setRowsFournisseur] = useState<DatedProductList[]>();
  const [isFournisseur , setFournisseur] = useState<Boolean>(false);
  const [CurrentFournisser , setCurrentFournisseur] = useState<String>("");


  

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };








  //looking for the product in the "special Names to add it"
  //change that one... 
  const handleSearchFournisseur = (productName: string) => {
    const normalizedSearch = productName.trim().toLowerCase();
    const newrows = AllFournisseurData.filter(fournisseur => 
      fournisseur.Name.toLowerCase().includes(normalizedSearch)
    );
    setRows(newrows);
  };


  

    const totalDepts = rows.reduce((sum, row) => sum + row.Depts , 0);
    //all the fournisseurs table
    if(!isFournisseur){
        return   (
    
    
            <div className="w-full p-4">

{
          //the total depts text field
            }
        <div className="flex justify-end items-center mb-4">
         <span className="text-6xl font-bold mr-10">Total depts:</span>
         <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
            {totalDepts.toFixed(2)}
         </span>
        </div>
        
        
            {
                //add manually field change it to add quantity... and add product
            }
            <div className="flex justify-between w-full pt-4 pb-4">
              <div>
              <button
                className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
              >
                add fournisseur
              </button> 
              </div>
                <MybuttonSearch textValue="" buttonText="Rechercher" placeholderText="le fournisseur / ses produits"
                onButtonClick={()=>{}}
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

        
          
          {rows.map((row, index) => (
        
            <div>
            <div key={index} className="text-center flex pt-2 pb-2 mt-1 mb-1 hover:bg-[#cac9c9]"
            onClick={()=>{
                setRowsFournisseur(inventory.find((fournisseur) => fournisseur.name === row.Name)?.datedProductLists);
                setFournisseur(true);

                
            }         
        }
            >
        
              {
                //Name
              }
              <div className={clsx(
                "basis-1/3 flex align-middle justify-center",
              )}
              >
                <div>{row.Name}</div></div>
        
        
    
        
              {
                //Phone number
              }
              <div className="basis-1/3 flex align-middle justify-center">
                {
                  row.PhoneNumber
                }
                </div>

              {
                //Depts
              }
              <div className="basis-1/3 flex align-middle justify-center">
                {
                  row.Depts
                }
                </div>
        
              {
                //delete and edit buttons add the ability to use a shorcut
              }  
               </div>      
              </div>
           
          ))}  
        
        
        </div>
        </div>
        
        
        
        
        
        
        
            </div>
          );
    }
    else{

        

        //the pages for each fournisseur
        console.log(CurrentFournisser);




        return (
            <div className="w-full p-4">


{
          //the total depts text field
            }
        <div className="flex justify-end items-center mb-4">
         <span className="text-6xl font-bold mr-10">Total depts:</span>
         <span className="text-6xl font-bold bg-[#BEE7DB] text-black px-4 py-2 rounded-2xl">
            {totalDepts.toFixed(2)}
         </span>
        </div>
        
        
            {
                //add manually field change it to add quantity... and add product
            }
            <div className="flex justify-between w-full pt-4 pb-4">
              <div>
              <button
                className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 m-1"
                onClick={()=>{setFournisseur(false)
                    setCurrentFournisseur("");
                }}
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
                    onClick={() => {setActiveTab(index)
                        console.log(index);
                        if(index == 1){
                           ;
                        }
                        else if(index == 2){
                            ;
                        }
                        else{
                            ;
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
              
              }
        

        
        
              {/**table */}
              {//wch hed div
              }

        <div className="">


        
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
                {rowFour.date}
            </div>


            <div className="rounded-2xl bg-[#EBEBEB]">

            {//the rows of each product
            }
            {
                

                rowFour.products.map((product, productIndex) => (<div 
                    key={index}
                    className={clsx(
                    "text-center w-full flex pt-2 pb-2",
                  )}>
                    {//product.productCode
                    }

        {//Product Code
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.productCode}
            </div>
        {//Product Name
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.productName}
            </div>

        {//unitPrice
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.unitPrice}
            </div>

        {//quantity
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {product.quantity}
            </div>

        {//total
          }
          <div className="basis-1/5 flex align-middle justify-center">
              {(product.quantity * product.unitPrice).toFixed(2)}
            </div>


                </div>))
            }

            <div className="flex w-full justify-start">
                <div className="bg-[#BEE7DB]  rounded-2xl ml-5 p-2 mb-1">
                   
                totale: {
                    rowFour.products.reduce((sum, row) => sum + row.quantity * row.unitPrice, 0)
                    
                }
                </div>

               
            </div>
            </div>
              </div>
           
          ))}  
        
        
        </div>
        </div>
            </div>
        )
    }

};

export default Tabs;