
import {FournisseurRow , FournisseurType} from "../../types";
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
    var allFourniData: FournisseurType[];
    
    try {
      const response = await axios.get("http://localhost:3001/suppliers/");
      console.log('Data all fournisseurs:', response.data);
      allFourniData = response.data.map((fournisseur:FournisseurType)=>({
        supplier_debt: fournisseur.supplier_debt,
        supplier_id: fournisseur.supplier_id,
        supplier_name: fournisseur.supplier_name,
        supplier_phone: fournisseur.supplier_phone,
      }))
      return allFourniData;

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