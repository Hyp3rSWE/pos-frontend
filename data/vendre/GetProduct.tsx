import {ProductRow} from '../../types/index';
import axios from 'axios';

//later on this will be changed use the endpoint... GET THE DATA
export  const CodesProducts: ProductRow[] = [
    { code: "1", product: "Bread", quantity: 1, unitPrice: 1.5 },
    { code: "2", product: "Eggs", quantity: 1, unitPrice: 0.2 },
    { code: "3", product: "Milk", quantity: 1, unitPrice: 1.2 },
    { code: "4", product: "Apples", quantity: 1, unitPrice: 0.5 },
    { code: "5", product: "Potatoes", quantity: 1, unitPrice: 0.3 },
    { code: "6", product: "Bananas", quantity: 1, unitPrice: 0.6 },
    { code: "7", product: "Cheese", quantity: 1, unitPrice: 2.0 },
    { code: "8", product: "Tomatoes", quantity: 1, unitPrice: 0.4 },
    { code: "9", product: "Carrots", quantity: 1, unitPrice: 0.2 },
    { code: "10", product: "Onions", quantity: 1, unitPrice: 0.25 },
    { code: "11", product: "Chicken", quantity: 1, unitPrice: 3.5 },
    { code: "12", product: "Fish", quantity: 1, unitPrice: 4.0 },
    { code: "13", product: "Butter", quantity: 1, unitPrice: 2.5 },
    { code: "14", product: "Yogurt", quantity: 1, unitPrice: 1.0 },
    { code: "15", product: "Pasta", quantity: 1, unitPrice: 0.8 },
    { code: "16", product: "Rice", quantity: 1, unitPrice: 0.7 },
    { code: "17", product: "Flour", quantity: 1, unitPrice: 0.9 },
    { code: "18", product: "Sugar", quantity: 1, unitPrice: 0.5 },
    { code: "19", product: "Salt", quantity: 1, unitPrice: 0.2 },
    { code: "20", product: "Oil", quantity: 1, unitPrice: 5.0 }
  ];

  const data = {
    invoice_cus_total_amount: 500,
    customer_id: 1,
    invoice_lines: [
      {
        product_id: 1,
        product_variant_id: 2,
        invoice_cus_line_quantity: 3,
        invoice_cus_line_price: 100,
      },
      {
        product_id: 2,
        product_variant_id: 3,
        invoice_cus_line_quantity: 1,
        invoice_cus_line_price: 200,
      },
    ],
  };

/**
  const newrow : ProductRow | undefined = CodesProducts.find(product => product.code === productCode);
 */

  export const getProdById = async (BarCode: String) =>  {
    try {
      var product : ProductRow = { code: "", product: "", quantity: 1, unitPrice: 0 };

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
      var product : ProductRow = { code: "", product: "", quantity: 1, unitPrice: 0 };

      const response = await axios.post("http://localhost:3001/invoices" + BarCode);
      console.log('Data:', response.data);
      product.code = response.data.product_barcode;
      product.product = response.data.product_name;
      product.unitPrice = response.data.product_price;
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
