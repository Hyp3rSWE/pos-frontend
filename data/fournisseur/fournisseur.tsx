import { InvoiceFournisseur, InvoiceLineFournisseur } from "../../types";
import axios from "axios";

export const getAllFournisseurInvoices = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/invoices-sup/sup-${id}`,
    );
    console.log("Data all invoices:", response.data);
    var allFourniData: InvoiceFournisseur[] = response.data.map(
      (invoice: any) => ({
        invoice_sup_timestamp: invoice.invoice_sup_timestamp,
        invoice_sup_total_amount: invoice.invoice_sup_total_amount,
        invoiceLines: invoice.invoiceLines.map((invoiceLine: any) => ({
          product_name: invoiceLine.product_name,
          product_barcode: invoiceLine.product_barcode,
          invoice_sup_line_quantity: invoiceLine.invoice_sup_line_quantity,
          invoice_sup_line_price: invoiceLine.invoice_sup_line_price,
          product_total:
            invoiceLine.invoice_sup_line_price *
            invoiceLine.invoice_sup_line_quantity,
        })),
      }),
    );
    console.log("Data all fournisseurs after refactoring:", allFourniData);
    return allFourniData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const handleAddPayment = async (id: number, formRef: any) => {
  const formData = new FormData(formRef.current);
  const data = Object.fromEntries(formData.entries());
  try {
    const response = await fetch(`http://localhost:3001/debt-sup/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
