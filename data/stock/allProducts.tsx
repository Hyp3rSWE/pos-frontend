import {ProductRow} from '../../types/index';
import axios from 'axios';



  export const getAllProduct = async () =>  {
    try {
      var allStockData: ProductRow[];
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

  export const getTotaleStock = async () =>  {
    try {
      const response = await axios.get("http://localhost:3001/statistics/total-stock");
      console.log('Data:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export   const handleaddProduct = async (formRef:any) => {
    console.log('CALLED');
    // Collect all form data
    const formData = new FormData(formRef.current);
    var data = Object.fromEntries(formData.entries());

    //because I'm forced to give the ID correct it in next sprint
    data.supplier_id = "1";

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
      console.error('Error adding product:', error);
    }
      
  };

  export const DeleteProduct = async (productId : string) => {
    try {
      const response = await axios.delete(`http://localhost:3001/products/${productId}`);
      console.log('Product deleted successfully:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error deleting product:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  export const UpdateProductPrice = async (productId: string, newPrice: number) => {
    try {
      const response = await axios.put(`http://localhost:3001/products/${productId}`, {
        product_price: newPrice, // Sending the updated price in the request body
      });
      console.log('Product price updated successfully:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating product price:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };