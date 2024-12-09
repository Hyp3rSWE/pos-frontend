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


const ProductTable: React.FC = () => {

  //later on this will be changed use the endpoint... GET THE DATA
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

  //the rows gets updated after reading value from scanner
  //or using "ajouter un produit" INITIALLY EMPTY
  const [rows, setRows] = useState<ProductRow[]>([
    { code: "12345678910", product: "Thon", quantity: 12, unitPrice: 100 },
    { code: "12345678910", product: "Thon", quantity: 12, unitPrice: 100 },
  ]);

  const [coloredInputIndex, setColoredIndex] = useState<number>(rows.length);

  const changedInputQuantityRef = useRef<HTMLInputElement>(null);




  useEffect(() => {
    if (changedInputQuantityRef.current) {
      changedInputQuantityRef.current.focus();
    }
  }, [rows]); 

  




  const handleQuantityChange = (index: number, value: number) => {
    const updatedRows = [...rows];
    updatedRows[index].quantity = value;
    setRows(updatedRows);
  };


  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  //looking for the product in the "special codes to add it"

  const handleAddProduct = (productCode: string) => {
    const newrow : ProductRow | undefined = specialCodesProducts.find(product => product.code === productCode);
    const updateRows = [...rows]
    //if item already exists
    const item = updateRows.find(product => product.code === productCode)
    const index = updateRows.findIndex(product => product.code === productCode)
    if(item === undefined){
      if (newrow !== undefined) {
        updateRows.push(newrow);
        setColoredIndex(rows.length);
      }
    }
    else{
      item.quantity += 1;
      setColoredIndex(index);
    }
    setRows(updateRows);
    
    
  };


  
  const totalAmount = rows.reduce((sum, row) => sum + row.quantity * row.unitPrice, 0);


  return (
    <div className="p-4">

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
      />
        </div>

        <br></br>

  

        
        


        <div className="w-full">

        <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3">
            <div className="basis-1/6 flex align-middle justify-center"><div className="font-bold">Code</div></div>
            <div className="basis-1/6 flex align-middle justify-center"><div className="font-bold">Produit</div></div>
            <div className="basis-1/6 flex align-middle justify-center"><div className="font-bold">Quantité</div></div>
            <div className="basis-1/6 flex align-middle justify-center"><div className="font-bold">Prix unitaire</div></div>
            <div className="basis-1/6 flex align-middle justify-center"><div className="font-bold">Prix totale</div></div>
            <div className="basis-1/6 flex align-middle justify-center"><div className="font-bold">Actions</div></div>
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
              <div className={clsx(
                "basis-1/6 flex align-middle justify-center",
              )}
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
              <div className= {clsx("basis-1/6 flex align-middle justify-center",
                 
                )}>
                <input
                  ref = {index == coloredInputIndex ? changedInputQuantityRef : null}
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                  className={"w-16 p-1 border rounded focus:bg-[#BEE7DB] h-8 text-center"
                  }
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
              <div>
              {(row.quantity * row.unitPrice).toFixed(2)}
              </div>
              </div>

              {
                //delete button add the ability to use a shorcut
              }
              <div className={clsx(
                "basis-1/6 flex align-middle justify-center h-6",
              )}>
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
        <button className="bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1">Valider</button>
      </div>
    </div>
  );
};

export default ProductTable;

