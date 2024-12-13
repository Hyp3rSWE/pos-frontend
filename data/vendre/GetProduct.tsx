import {ProductRow} from '../../types/index';
import axios from 'axios';

  export const getProdByCode = async (BarCode: String) =>  {
    try {
      var product : ProductRow = { code: "", product: "", quantity: 1, unitPrice: 0 , productid: ""};

      const response = await axios.get("http://localhost:3001/products/barcode/" + BarCode);
      console.log('Data:', response.data);
      product.code = response.data.product_barcode;
      product.product = response.data.product_name;
      product.unitPrice = response.data.product_price;
      return product
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export const validateInvoice = async (BarCode: String) =>  {
    try {
      var product : ProductRow = { code: "", product: "", quantity: 1, unitPrice: 0 , productid: ""};

      const response = await axios.post("http://localhost:3001/invoices" + BarCode);
      console.log('Data:', response.data);
      product.code = response.data.product_barcode;
      product.product = response.data.product_name;
      product.unitPrice = response.data.product_price;
      product.productid = response.data.product_id
      return product
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const createInvoice = async (data: any) => {
    const url = 'http://localhost:3001/invoices';  
    try {
      // Make the POST request
      const response = await axios.post(url, data);
      console.log('Success:', response.data); // Handle success
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
