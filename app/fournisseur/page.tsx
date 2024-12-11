"use client"
import React from "react";
import Tabs from "../../components/table/allFournisseurTable";
import MySidebar from "../../components/sidebar";

const Home: React.FC = () => {
  const tabs = [
    { label: "History of products", content: <div></div> },
    { label: "History of payement", content: <div></div> },
  ];

  return (
    <div className="flex justify-center h-screen">
      <MySidebar />
      <div className="ml-48 w-full"><Tabs tabs={tabs}/></div>
    </div>
  );
};

export default Home;