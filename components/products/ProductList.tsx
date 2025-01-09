'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Supplier {
  supplier_id: number;
  supplier_name: string;
  supplier_phone: string;
  supplier_debt: number;
}

interface Product {
  product_id: number;
  supplier_id: number;
  product_barcode: string;
  product_price: number;
  product_cost: number;
  product_name: string;
  product_stock_level: number;
}

const ProductList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:3001/suppliers');
      const data = await response.json();
      setSuppliers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast.error('Failed to load suppliers');
      setLoading(false);
    }
  };

  const fetchProducts = async (supplierId: number) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      const filteredProducts = data.filter((product: Product) => product.supplier_id === supplierId);
      setProducts(filteredProducts);
      setSelectedSupplier(supplierId);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex gap-6 h-[calc(100vh-180px)]">
      {/* Suppliers List */}
      <div className="w-1/3 flex flex-col">
        <div className="bg-[#BEE7DB] p-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Suppliers</h2>
            <input
              type="text"
              placeholder="Search suppliers..."
              className="px-3 py-1 rounded-lg border focus:outline-none focus:border-[#5CC3A4]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-[#EBEBEB] rounded-b-2xl p-4 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5CC3A4]" />
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSuppliers.map((supplier) => (
                <div
                  key={supplier.supplier_id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedSupplier === supplier.supplier_id
                      ? 'bg-[#5CC3A4] text-white shadow-lg transform scale-[1.02]'
                      : 'bg-white hover:bg-gray-50 hover:shadow-md'
                  }`}
                  onClick={() => fetchProducts(supplier.supplier_id)}
                >
                  <div className="font-medium text-lg">{supplier.supplier_name}</div>
                  <div className={`text-sm ${selectedSupplier === supplier.supplier_id ? 'text-white/90' : 'text-gray-600'}`}>
                    📞 {supplier.supplier_phone}
                  </div>
                  <div className={`text-sm ${selectedSupplier === supplier.supplier_id ? 'text-white/90' : 'text-gray-600'}`}>
                    💰 Debt: ${supplier.supplier_debt.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products List */}
      <div className="w-2/3 flex flex-col">
        <div className="bg-[#BEE7DB] p-4 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-800">Products</h2>
        </div>
        <div className="bg-[#EBEBEB] rounded-b-2xl p-4 flex-1 overflow-y-auto">
          {selectedSupplier ? (
            products.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-6 gap-4 p-3 bg-[#5CC3A4] text-white rounded-xl font-semibold">
                  <div>Barcode</div>
                  <div className="col-span-2">Name</div>
                  <div>Stock</div>
                  <div>Price</div>
                  <div>Cost</div>
                </div>
                {products.map((product) => (
                  <div
                    key={product.product_id}
                    className="grid grid-cols-6 gap-4 p-3 bg-white rounded-xl hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="font-mono">{product.product_barcode}</div>
                    <div className="col-span-2">{product.product_name}</div>
                    <div>{product.product_stock_level}</div>
                    <div className="text-green-600">{product.product_price.toFixed(2)}</div>
                    <div className="text-gray-600">{product.product_cost.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-xl">No products found for this supplier</p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
              </svg>
              <p className="text-xl">Select a supplier to view their products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList; 