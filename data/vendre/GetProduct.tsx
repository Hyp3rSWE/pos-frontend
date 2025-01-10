import { ProductRow, LineObject } from "../../types/index";
import axios from "axios";

export const getProdByCode = async (BarCode: String) => {
  try {
    var product: ProductRow = {
      code: "",
      product: "",
      quantity: 1,
      unitPrice: 0,
      productid: "",
      timestamp: ""
    };

    const response = await axios.get(
      "http://localhost:3001/products/barcode/" + BarCode,
    );
    console.log("Data:", response.data);
    product.code = response.data.product_barcode;
    product.product = response.data.product_name;
    product.unitPrice = response.data.product_price;
    product.productid = response.data.product_id;
    return product;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const validateInvoice = async (BarCode: String) => {
  try {
    var product: ProductRow = {
      code: "",
      product: "",
      quantity: 1,
      unitPrice: 0,
      productid: "",
      timestamp: ""
    };

    const response = await axios.post(
      "http://localhost:3001/invoices" + BarCode,
    );
    console.log("Data:", response.data);
    product.code = response.data.product_barcode;
    product.product = response.data.product_name;
    product.unitPrice = response.data.product_price;
    product.productid = response.data.product_id;
    return product;
  } catch (error) {
    console.error("Error:", error);
  }
};

const createInvoice = async (data: any) => {
  const url = "http://localhost:3001/invoices";
  try {
    // Make the POST request
    const response = await axios.post(url, data);
    console.log("Success:", response.data); // Handle success
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const handleAddInvoice = async (rows: ProductRow[], amount: Number) => {
  console.log("function called");
  var lineObjects: LineObject[] = [];
  for (const item of rows) {
    var newObj: LineObject = {
      product_id: Number(item.productid),
      invoice_cus_line_price: item.unitPrice,
      product_variant_id: null,
      invoice_cus_line_quantity: item.quantity,
    };

    lineObjects.push(newObj);
  }

  var sendData = {
    invoice_lines: lineObjects,
    invoice_cus_total_amount: amount,
    customer_id: 1,
  };
  /**
     *   "invoice_cus_total_amount": 500,
  "customer_id": 1,
     */

  try {
    const response = await fetch(`http://localhost:3001/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
