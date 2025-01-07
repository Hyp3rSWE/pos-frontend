"use client";
import React, { useState, useEffect } from "react";
import MySidebar from "../../components/sidebar";
import MybuttonSearch from "../../components/buttonSearch/buttonSearch";
import Dropdown from "../../components/dropDown";
import axios from "axios";
import { ProductRow, Adjustment } from "../../types";

export default function History() {
    // States for sales history
    const [rows, setRows] = useState<ProductRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<ProductRow[]>(rows);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [timeFilter, setTimeFilter] = useState<string>("all");

    // States for adjustments
    const [adjustments, setAdjustments] = useState<Adjustment[]>([]);
    const [filteredAdjustments, setFilteredAdjustments] = useState<
        Adjustment[]
    >([]);
    const [activeTab, setActiveTab] = useState("sales");

    // Fetch initial data
    useEffect(() => {
        fetchHistory();
        fetchAdjustments();
    }, []);

    // Fetch sales history
    const fetchHistory = async () => {
        try {
            const response = await axios.get("http://localhost:3001/invoices");

            if (response.status === 200) {
                const transformedRows: ProductRow[] = [];

                for (const invoice of response.data) {
                    for (const line of invoice.invoiceLines) {
                        const productResponse = await axios.get(
                            `http://localhost:3001/products/${line.product_id}`
                        );
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

    // Fetch adjustments
    const fetchAdjustments = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/adjustments"
            );
            if (response.status === 200) {
                setAdjustments(response.data);
                setFilteredAdjustments(response.data);
            }
        } catch (e) {
            console.error("Error fetching adjustments:", e.message);
        }
    };

    // Handle search for both tabs
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (activeTab === "sales") {
            const filtered = rows.filter(
                (row) =>
                    row.product.toLowerCase().includes(query.toLowerCase()) ||
                    row.timestamp.split("T")[0].includes(query)
            );
            setFilteredRows(query ? filtered : rows);
        } else {
            const filtered = adjustments.filter(
                (adj) =>
                    adj.Product?.product_name
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    adj.adjustment_timestamp.split("T")[0].includes(query)
            );
            setFilteredAdjustments(query ? filtered : adjustments);
        }
    };

    // Handle time filter for both tabs
    const handleTimeFilter = (filter: string) => {
        setTimeFilter(filter);
        const today = new Date().toISOString().split("T")[0];
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        if (activeTab === "sales") {
            let filtered = [...rows];
            if (filter === "today") {
                filtered = rows.filter(
                    (row) => row.timestamp.split("T")[0] === today
                );
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
        } else {
            let filtered = [...adjustments];
            if (filter === "today") {
                filtered = adjustments.filter(
                    (adj) => adj.adjustment_timestamp.split("T")[0] === today
                );
            } else if (filter === "thisWeek") {
                filtered = adjustments.filter(
                    (adj) => new Date(adj.adjustment_timestamp) >= oneWeekAgo
                );
            } else if (filter === "thisMonth") {
                filtered = adjustments.filter(
                    (adj) => new Date(adj.adjustment_timestamp) >= oneMonthAgo
                );
            }
            setFilteredAdjustments(filtered);
        }
    };

    const groupedRows = filteredRows.reduce(
        (acc, row) => {
            const date = row.timestamp.split("T")[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(row);
            return acc;
        },
        {} as Record<string, ProductRow[]>
    );

    return (
        <div className="flex">
            <MySidebar />
            <div className="flex flex-col w-full mt-10">
                {/* Tabs - adjusted margin-left and color */}
                <div className="flex border-b border-gray-200 mb-4 ml-52">
                    <button
                        onClick={() => setActiveTab("sales")}
                        className={`px-4 py-2 ${
                            activeTab === "sales"
                                ? "border-b-2 border-[#BEE7DB] text-[#2C5282]"
                                : "text-gray-500"
                        }`}
                    >
                        Sales History
                    </button>
                    <button
                        onClick={() => setActiveTab("adjustments")}
                        className={`px-4 py-2 ${
                            activeTab === "adjustments"
                                ? "border-b-2 border-[#BEE7DB] text-[#2C5282]"
                                : "text-gray-500"
                        }`}
                    >
                        Stock Adjustments
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="flex justify-end p-4 space-x-4 mt-0">
                    <MybuttonSearch
                        textValue={searchQuery}
                        buttonText="Rechercher"
                        placeholderText={
                            activeTab === "sales"
                                ? "Nom du produit ou date"
                                : "Nom du produit ou date d'ajustement"
                        }
                        onButtonClick={(value) => handleSearch(value)}
                        Downkey="Enter"
                    />
                    <Dropdown
                        onSelect={handleTimeFilter}
                        selectedFilter={timeFilter}
                    />
                </div>

                {/* Content */}
                {activeTab === "sales" ? (
                    // Sales History Table
                    <div className="p-4 pl-52">
                        <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3 mb-7">
                            <div className="basis-1/5 flex align-middle justify-center font-bold">
                                Code
                            </div>
                            <div className="basis-1/5 flex align-middle justify-center font-bold">
                                Produit
                            </div>
                            <div className="basis-1/5 flex align-middle justify-center font-bold">
                                Quantité
                            </div>
                            <div className="basis-1/5 flex align-middle justify-center font-bold">
                                Prix Unitaire
                            </div>
                            <div className="basis-1/5 flex align-middle justify-center font-bold">
                                Prix Total
                            </div>
                        </div>
                        {Object.entries(groupedRows).map(([date, dateRows]) => (
                            <div key={date} className="mb-8">
                                <h2 className="text-lg font-bold mb-2">
                                    {date}
                                </h2>
                                <div className="bg-[#EBEBEB] rounded-2xl w-full mt-2 max-h-72 overflow-y-scroll">
                                    {dateRows.map((row, index) => (
                                        <div
                                            key={index}
                                            className="text-center flex py-2"
                                        >
                                            <div className="basis-1/5 flex align-middle justify-center">
                                                {row.code}
                                            </div>
                                            <div className="basis-1/5 flex align-middle justify-center">
                                                {row.product}
                                            </div>
                                            <div className="basis-1/5 flex align-middle justify-center">
                                                {row.quantity}
                                            </div>
                                            <div className="basis-1/5 flex align-middle justify-center">
                                                {row.unitPrice}
                                            </div>
                                            <div className="basis-1/5 flex align-middle justify-center">
                                                {row.quantity * row.unitPrice}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Adjustments History Table
                    <div className="p-4 pl-52">
                        <div className="bg-[#BEE7DB] flex rounded-2xl pt-2 pb-2 pl-3 pr-3 mb-7">
                            <div className="basis-1/6 flex align-middle justify-center font-bold">
                                Date
                            </div>
                            <div className="basis-1/6 flex align-middle justify-center font-bold">
                                Produit
                            </div>
                            <div className="basis-1/6 flex align-middle justify-center font-bold">
                                Ancienne Qté
                            </div>
                            <div className="basis-1/6 flex align-middle justify-center font-bold">
                                Nouvelle Qté
                            </div>
                            <div className="basis-1/6 flex align-middle justify-center font-bold">
                                Différence
                            </div>
                            <div className="basis-1/6 flex align-middle justify-center font-bold">
                                Raison
                            </div>
                        </div>
                        <div className="bg-[#EBEBEB] rounded-2xl w-full mt-2 max-h-72 overflow-y-scroll">
                            {filteredAdjustments.map((adjustment, index) => (
                                <div
                                    key={index}
                                    className="text-center flex py-2"
                                >
                                    <div className="basis-1/6 flex align-middle justify-center">
                                        {new Date(
                                            adjustment.adjustment_timestamp
                                        ).toLocaleDateString()}
                                    </div>
                                    <div className="basis-1/6 flex align-middle justify-center">
                                        {adjustment.Product?.product_name}
                                    </div>
                                    <div className="basis-1/6 flex align-middle justify-center">
                                        {adjustment.previous_quantity}
                                    </div>
                                    <div className="basis-1/6 flex align-middle justify-center">
                                        {adjustment.new_quantity}
                                    </div>
                                    <div className="basis-1/6 flex align-middle justify-center">
                                        <span
                                            className={`px-2 py-1 rounded-full ${
                                                adjustment.new_quantity >
                                                adjustment.previous_quantity
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {adjustment.new_quantity -
                                                adjustment.previous_quantity}
                                        </span>
                                    </div>
                                    <div className="basis-1/6 flex align-middle justify-center">
                                        {adjustment.adjustment_reason}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
