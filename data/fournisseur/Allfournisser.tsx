
import {FournisseurRow } from "../../types";
import axios from "axios"

//later on use axios in here
  export const AllFournisseurData: FournisseurRow[] = [
    {
      Name: "Supplier A",
      PhoneNumber: "123-456-7890",
      Depts: 5000,
    },
    {
      Name: "Supplier B",
      PhoneNumber: "234-567-8901",
      Depts: 3000,
    },
    {
      Name: "Supplier C",
      PhoneNumber: "345-678-9012",
      Depts: 7000,
    },
  ];

  export const getAllFournisseur:any  = async ()=> {
    try {
      var allStockData: FournisseurRow[];
      const response = await axios.get("http://localhost:3001/products/");
      console.log('Data:', response.data);
      allStockData = response.data.map((product:any)=>({
        code: product.product_barcode,
        product: product.product_name,
        quantity: product.product_stock_level,
        unitPrice: product.product_price,
        productid: product.product_id
      }))
      return allStockData;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export   const handleaddFournisseur = async (formRef:any) => {
    console.log('CALLED');
    // Collect all form data
    const formData = new FormData(formRef.current);
    var data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);

    // Send the form data in a POST request
    
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
      
  };