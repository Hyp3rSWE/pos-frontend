"use client";
import React, { useState, useEffect } from "react";
import MySidebar from "../../components/sidebar";
import MybuttonSearch from "../../components/buttonSearch/buttonSearch";
import Dropdown from "../../components/dropDown";

interface ProductRow {
  code: string;
  product: string;
  quantity: number;
  unitPrice: number;
  timestamp: string;
}

export default function History() {
  const [rows, setRows] = useState<ProductRow[]>([
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "1", product: "Bread", quantity: 10, unitPrice: 15, timestamp: "2024-12-11" },
    { code: "2", product: "Milk", quantity: 8, unitPrice: 12, timestamp: "2024-12-11" },
    { code: "2", product: "Milk", quantity: 8, unitPrice: 12, timestamp: "2024-12-11" },
    { code: "2", product: "Milk", quantity: 8, unitPrice: 12, timestamp: "2024-12-11" },
    { code: "3", product: "Eggs", quantity: 12, unitPrice: 20, timestamp: "2024-12-12" },
    { code: "4", product: "Eggs", quantity: 12, unitPrice: 20, timestamp: "2024-12-12" },
    { code: "5", product: "Eggs", quantity: 12, unitPrice: 20, timestamp: "2024-12-13" },
    { code: "5", product: "Eggs", quantity: 12, unitPrice: 20, timestamp: "2024-12-13" },
    { code: "5", product: "Eggs", quantity: 12, unitPrice: 20, timestamp: "2024-12-1" },


  ]);

  const [filteredRows, setFilteredRows] = useState<ProductRow[]>(rows);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const handleSearchProduct = (query: string) => {
    setSearchQuery(query);
    const filtered = rows.filter(
      (row) =>
        row.product.toLowerCase().includes(query.toLowerCase()) ||
        row.timestamp.split("T")[0].includes(query)
    );
    setFilteredRows(query ? filtered : rows); // Show all if query is empty
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
                    <div className="basis-1/5 flex align-middle justify-center">{row.unitPrice * row.quantity}</div>
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
