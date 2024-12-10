import {FournisseurTrans} from "../types/index";
  
  export const fournisseursWithPayments: FournisseurTrans[] = [
    {
      Name: "Supplier A",
      transactions: [
        { date: "2024-12-01", amountPaid: 150 },
        { date: "2024-12-04", amountPaid: 200 },
        { date: "2024-12-07", amountPaid: 250 },
        { date: "2024-12-10", amountPaid: 300 },
        { date: "2024-12-13", amountPaid: 180 },
        { date: "2025-12-13", amountPaid: 180 },
        { date: "2025-12-14", amountPaid: 180 },
        { date: "2025-12-15", amountPaid: 180 },
      ],
    },
    {
      Name: "Supplier B",
      transactions: [
        { date: "2024-12-02", amountPaid: 180 },
        { date: "2024-12-05", amountPaid: 120 },
        { date: "2024-12-08", amountPaid: 300 },
        { date: "2024-12-11", amountPaid: 250 },
        { date: "2024-12-14", amountPaid: 100 },
      ],
    },
    {
      Name: "Supplier C",
      transactions: [
        { date: "2024-12-01", amountPaid: 220 },
        { date: "2024-12-03", amountPaid: 140 },
        { date: "2024-12-06", amountPaid: 310 },
        { date: "2024-12-09", amountPaid: 190 },
        { date: "2024-12-12", amountPaid: 170 },
      ],
    },
  ];
  