import { ProductRow } from "../../types/index";
import axios from "axios";

export const getAllProduct = async () => {
  try {
    var allStockData: ProductRow[];
    const response = await axios.get("http://localhost:3001/products/");
    console.log("Data:", response.data);
    allStockData = response.data.map((product: any) => ({
      code: product.product_barcode,
      product: product.product_name,
      quantity: product.product_stock_level,
      unitPrice: product.product_price,
      productid: product.product_id,
    }));
    return allStockData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getTotaleStock = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/statistics/total-stock",
    );
    console.log("Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const handleaddProduct = async (formRef: any, isGros: boolean) => {
  const formData: any = new FormData(formRef.current);
  console.log("CALLED");
  // Collect all form data
  if (!isGros) {
    console.log("it is in if");
    var sendData = {
      product_barcode: -1,
      product_name: "",
      product_stock_level: -1,
      product_price: -1,
      product_cost: -1,
      supplier_id: 1, //because I'm forced to give the ID correct it in next sprint
      //jet next sprint ou maderneheche
    };
    //product_barcode product_name product_stock_level product_price product_cost
    sendData.product_barcode = formData.get("product_barcode");
    sendData.product_name = formData.get("product_name");
    sendData.product_stock_level = formData.get("product_stock_level");
    sendData.product_price = formData.get("product_price");
    sendData.product_cost = formData.get("product_cost");
    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  } else {
    console.log("it is in else not in if");
    //'http://localhost:3001/products/barcode/12345'
    /**
         "product_id": 0,
        "variant_barcode": "string",
        "variant_price": 0,
        "variant_quantity": 0,
        "variant_stock_level": 0
       */
    var sendDataGros = {
      product_id: -1,
      variant_barcode: "",
      variant_price: -1,
      variant_quantity: -1,
      variant_stock_level: -1,
    };
    try {
      //formData[]
      console.log("before");
      const response = await axios.get(
        `http://localhost:3001/products/barcode/${formData.get("product_barcode_for_variant")}`,
      );
      console.log("after");
      console.log("Data:", response.data);
      //"product_id": 27,

      sendDataGros.product_id = response.data["product_id"];
      sendDataGros.variant_barcode = formData.get("product_barcode");
      sendDataGros.variant_stock_level = formData.get("product_stock_level");
      sendDataGros.variant_price = formData.get("product_price");
      sendDataGros.variant_quantity = formData.get(
        "product_quantity_for_variant",
      );
      try {
        const response = await fetch("http://localhost:3001/productVariants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendDataGros),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error getting product ID:", error);
      }
    } catch (error) {
      console.error("Error adding product variant:", error);
    }
  }
};

export const DeleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/products/${productId}`,
    );
    console.log("Product deleted successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting product:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const UpdateProductPrice = async (
  productId: string,
  newPrice: number,
) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/products/${productId}`,
      {
        product_price: newPrice, // Sending the updated price in the request body
      },
    );
    console.log("Product price updated successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error updating product price:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
