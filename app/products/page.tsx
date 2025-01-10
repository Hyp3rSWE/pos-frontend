"use client";

import React from "react";
import ProductList from "@/components/products/ProductList";
import MySidebar from "@/components/sidebar";

const ProductsPage = () => {
  return (
    <div className="flex h-screen">
      <MySidebar />
      <main className="flex-1 ml-48 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Products by Supplier
          </h1>
          <ProductList />
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
