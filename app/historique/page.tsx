"use client";
import React, { useState, useEffect } from "react";
import MySidebar from "../../components/sidebar";
import MybuttonSearch from "../../components/buttonSearch/buttonSearch";
import Dropdown from "../../components/dropDown";
import axios from "axios";

interface ProductRow {
  code: string;
  product: string;
  quantity: number;
  unitPrice: number;
  timestamp: string;
}

export default function History() {
  const [rows, setRows] = useState<ProductRow[]>([

  ]);

  const [filteredRows, setFilteredRows] = useState<ProductRow[]>(rows);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3001/invoices");

      if (response.status === 200) {
        const transformedRows: ProductRow[] = [];

        for (const invoice of response.data) {
          for (const line of invoice.invoiceLines) {
            const productResponse = await axios.get(`http://localhost:3001/products/${line.product_id}`);
            if (productResponse.status === 200) {
              transformedRows.push({
                code: invoice.invoice_cus_id.toString(),
                product: productResponse.data.product_name,
                quantity: line.invoice_cus_line_quantity,
                unitPrice: line.invoice_cus_line_price,
                timestamp: invoice.invoice_cus_timestamp,
              });
            }
          }
        }

        setRows(transformedRows);
        setFilteredRows(transformedRows);
      }
    } catch (e) {
      console.error("Error fetching history:", e.message);
    }
  };


  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearchProduct = (query: string) => {
    setSearchQuery(query);
    const filtered = rows.filter(
      (row) =>
        row.product.toLowerCase().includes(query.toLowerCase()) ||
        row.timestamp.split("T")[0].includes(query)
    );
    setFilteredRows(query ? filtered : rows);
  };

  const handleTimeFilter = (filter: string) => {
    setTimeFilter(filter);

    let filtered = [...rows];

    const today = new Date().toISOString().split("T")[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (filter === "today") {
      filtered = rows.filter((row) => row.timestamp.split("T")[0] === today);
    } else if (filter === "thisWeek") {
      filtered = rows.filter(
        (row) => new Date(row.timestamp) >= oneWeekAgo
      );
    } else if (filter === "thisMonth") {
      filtered = rows.filter(
        (row) => new Date(row.timestamp) >= oneMonthAgo
      );
    }

    setFilteredRows(filtered);
  };

  const groupedRows = filteredRows.reduce((acc, row) => {
    const date = row.timestamp.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(row);
    return acc;
  }, {} as Record<string, ProductRow[]>);

  return (
    <div className="flex">
      <MySidebar />
      <div className="flex flex-col w-full">
        <div className="flex justify-end p-4 space-x-4 mt-0">
          <MybuttonSearch
            textValue={searchQuery}
            buttonText="Rechercher"
            placeholderText="Nom du produit ou date"
            onButtonClick={(value) => handleSearchProduct(value)}
            Downkey="Enter"
          />
          <Dropdown onSelect={handleTimeFilter} selectedFilter={timeFilter} />
        </div>

        <div className="p-4 pl-52 ">
          <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3 mb-7">
            <div className="basis-1/5 flex align-middle justify-center font-bold">Code</div>
            <div className="basis-1/5 flex align-middle justify-center font-bold">Produit</div>
            <div className="basis-1/5 flex align-middle justify-center font-bold">Quantité</div>
            <div className="basis-1/5 flex align-middle justify-center font-bold">Prix Unitaire</div>
            <div className="basis-1/5 flex align-middle justify-center font-bold">Prix Total</div>
          </div>
          {Object.entries(groupedRows).map(([date, dateRows]) => (
            <div key={date} className="mb-8">
              <h2 className="text-lg font-bold mb-2">{date}</h2>
              <div className="bg-[#EBEBEB] rounded-2xl w-full mt-2 max-h-72 overflow-y-scroll">
                {dateRows.map((row, index) => (
                  <div key={index} className="text-center flex py-2">
                    <div className="basis-1/5 flex align-middle justify-center">{row.code}</div>
                    <div className="basis-1/5 flex align-middle justify-center">{row.product}</div>
                    <div className="basis-1/5 flex align-middle justify-center">{row.quantity}</div>
                    <div className="basis-1/5 flex align-middle justify-center">{row.unitPrice}</div>
                    <div className="basis-1/5 flex align-middle justify-center">{}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
