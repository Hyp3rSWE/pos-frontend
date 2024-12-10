"use client"
import React from "react";
import Tabs from "../../components/table/stockTable";
import MySidebar from "../../components/sidebar";

const Home: React.FC = () => {
  const tabs = [
    { label: "Tout", content: <div>All content displayed here</div> },
    { label: "Under threshold", content: <div>Low stock content displayed here</div> },
    { label: "Rupture stock", content: <div>Out of stock content displayed here</div> },
  ];

  return (
    <div className="flex justify-center h-screen">
      <MySidebar />
      <div className="ml-48 w-full"><Tabs tabs={tabs}/></div>
    </div>
  );
};

export default Home;

  