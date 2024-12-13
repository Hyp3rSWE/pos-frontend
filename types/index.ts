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

export interface FournisseurRow {
  Name: string;
  PhoneNumber: string;
  Depts: number;
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

    // Define the structure for a fournisseur with dated product lists
export  interface Fournisseur {
      name: string; // Supplier name
      datedProductLists: DatedProductList[]; // List of dated product lists for the supplier
    }

export  interface FournisseurTrans {
      Name: string;
      transactions: Transaction[];
    }