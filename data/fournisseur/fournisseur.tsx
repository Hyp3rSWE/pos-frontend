import {Fournisseur} from "../../types";


  
  // Create the outer list that holds all fournisseurs
  export const inventory: Fournisseur[] = [
    {
      name: "Supplier A",
      datedProductLists: [
        {
          date: "2024-12-08",
          products: [
            {
              unitPrice: 50.5,
              productCode: "A123",
              productName: "Widget Alpha",
              quantity: 100,
            },
            {
              unitPrice: 30.0,
              productCode: "B456",
              productName: "Widget Beta",
              quantity: 200,
            },
          ],
        },
        {
          date: "2024-12-09",
          products: [
            {
              unitPrice: 45.0,
              productCode: "A124",
              productName: "Widget Gamma",
              quantity: 150,
            },
            {
              unitPrice: 60.0,
              productCode: "A125",
              productName: "Widget Delta",
              quantity: 80,
            },
          ],
        },
      ],
    },
    {
      name: "Supplier B",
      datedProductLists: [
        {
          date: "2024-12-08",
          products: [
            {
              unitPrice: 75.0,
              productCode: "C789",
              productName: "Gadget Gamma",
              quantity: 50,
            },
            {
              unitPrice: 120.0,
              productCode: "D012",
              productName: "Gadget Delta",
              quantity: 80,
            },
          ],
        },
        {
          date: "2024-12-10",
          products: [
            {
              unitPrice: 90.0,
              productCode: "E345",
              productName: "Gadget Epsilon",
              quantity: 40,
            },
            {
              unitPrice: 150.0,
              productCode: "F678",
              productName: "Gadget Zeta",
              quantity: 25,
            },
          ],
        },
      ],
    },
    {
      name: "Supplier C",
      datedProductLists: [
        {
          date: "2024-12-07",
          products: [
            {
              unitPrice: 20.0,
              productCode: "G910",
              productName: "Tool Theta",
              quantity: 300,
            },
            {
              unitPrice: 25.0,
              productCode: "H111",
              productName: "Tool Iota",
              quantity: 150,
            },
          ],
        },
        {
          date: "2024-12-09",
          products: [
            {
              unitPrice: 35.0,
              productCode: "J222",
              productName: "Tool Kappa",
              quantity: 100,
            },
            {
              unitPrice: 40.0,
              productCode: "K333",
              productName: "Tool Lambda",
              quantity: 200,
            },
          ],
        },
      ],
    },
  ];
  
  // Example of accessing data
  console.log("Inventory for Supplier A on 2024-12-08:", inventory[0].datedProductLists[0]);
  console.log("First product for Supplier B on 2024-12-08:", inventory[1].datedProductLists[0].products[0]);
  console.log("Inventory for Supplier C on 2024-12-07:", inventory[2].datedProductLists[0]);
  