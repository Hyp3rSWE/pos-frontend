import React from "react";
import { PosPrinter } from "electron-pos-printer";
const {ipcRenderer } = require('electron');
import * as path from "path";

const PrinterComponent = () => {
  const handlePrint = () => {
    const data = [

      {
        type: "text",
        value: "SAMPLE HEADING",
        style: { fontWeight: "700", textAlign: "center", fontSize: "24px" },
      },
      {
        type: "text",
        value: "Secondary text",
        style: {
          textDecoration: "underline",
          fontSize: "10px",
          textAlign: "center",
          color: "red",
        },
      },
      {
        type: "barCode",
        value: "023456789010",
        height: 40,
        width: 2,
        displayValue: true,
        fontsize: 12,
      },
      {
        type: "table",
        style: { border: "1px solid #ddd" },
        tableHeader: ["Animal", "Age"],
        tableBody: [
          ["Cat", 2],
          ["Dog", 4],
          ["Horse", 12],
          ["Pig", 4],
        ],
        tableFooter: ["Animal", "Age"],
        tableHeaderStyle: { backgroundColor: "#000", color: "white" },
        tableBodyStyle: { border: "0.5px solid #ddd" },
        tableFooterStyle: { backgroundColor: "#000", color: "white" },
      },
    ];

    const options = {
      silent: false,
      preview: false,
      margin: "0 0 0 0",
      copies: 1,
      printerName: "Your_Printer_Name", // Replace with your printer name
      timeOutPerLine: 400,
      pageSize: { height: 301000, width: 71000 }, // Optional for custom size
    };

    // PosPrinter.print(data, options)
    //   .then(() => console.log("Print success"))
    //   .catch((error) => console.error("Print failed", error));

    ipcRenderer.send('print', JSON.stringify(data));
  };

  return (
                <button className={clsx("bg-[#BEE7DB] hover:bg-[#5CC3A4] px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 m-1",
                !SavePricepopup&&"hidden")}
                onClick={handlePrint}>Yes</button>
  );
};

export default PrinterComponent;
