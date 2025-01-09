import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ProductRow {
  productid: string;
  code: string;
  product: string;
  quantity: number;
  unitPrice: number;
}


export interface Tab {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
}



export interface Product {
    unitPrice: number; 
    productCode: string;
    productName: string; 
    quantity: number; 
  }
  

export interface DatedProductList {
    date: string; 
    products: Product[]; 
  }

export interface Transaction {
    date: string;
    amountPaid: number;
  }

    // Define the structure for a fournisseur with dated product lists REMOVE WHEN DONE
export  interface Fournisseur {
      name: string; // Supplier name
      datedProductLists: DatedProductList[]; // List of dated product lists for the supplier
    }

export  interface FournisseurTrans {
      Name: string;
      transactions: Transaction[];
    }

    export  interface FournisseurType {
      supplier_debt:number;
      supplier_id:string;
      supplier_name:string;
      supplier_phone:string;
    }

    export interface InvoiceLineFournisseur{
      product_name: string,
      product_barcode: string,
      invoice_sup_line_quantity: number,
      invoice_sup_line_price: number,
      product_total:number,
    }

    export interface InvoiceFournisseur{
      invoice_sup_timestamp: String
      invoice_sup_total_amount: Number,
      invoiceLines : InvoiceLineFournisseur[],
    }

    export interface Adjustment {
      adjustment_id: number;
      user_id: number;
      product_id: number;
      product_variant_id?: number;
      previous_quantity: number;
      new_quantity: number;
      adjustment_reason: string;
      adjustment_timestamp: string;
      Product?: {
        product_name: string;
      };
      ProductVariant?: {
        variant_barcode: string;
      };
    }

    export type LineObject = {
      product_id: number;
      product_variant_id: number | null;
      invoice_cus_line_quantity: number;
      invoice_cus_line_price: number;
    };
    

    /*
{
    "invoice_sup_id": 1,
    "supplier_id": 1,
    "invoice_sup_timestamp": "2024-12-06T08:00:00.000Z",
    "invoice_sup_total_amount": 300,
    "invoiceLines": [
        {
            "product_id": 1,
            "invoice_sup_id": 1,
            "product_variant_id": 1,
            "invoice_sup_line_quantity": 5,
            "invoice_sup_line_price": 55,

            "product_cost": null,
            "product_price": 120
        }
    ]
}
      */