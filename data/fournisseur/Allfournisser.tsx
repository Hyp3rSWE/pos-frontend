import { FournisseurType } from "../../types";
import axios from "axios";

export const getAllFournisseur: any = async () => {
  var allFourniData: FournisseurType[];
  try {
    const response = await axios.get("http://localhost:3001/suppliers/");
    allFourniData = response.data.map((fournisseur: FournisseurType) => ({
      supplier_debt: fournisseur.supplier_debt,
      supplier_id: fournisseur.supplier_id,
      supplier_name: fournisseur.supplier_name,
      supplier_phone: fournisseur.supplier_phone,
    }));
    return allFourniData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const handleaddFournisseur = async (formRef: any) => {
  const formData = new FormData(formRef.current);
  var data = Object.fromEntries(formData.entries());
  try {
    const response = await fetch("http://localhost:3001/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const getTotaleDepts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/statistics/total-supplier-debt",
    );
    console.log("Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
