'use client';

import { useState, useEffect } from 'react';
// import Sidebar from './component/sidebar';
//  import axios from 'axios';

export default function SettingsPage() {
  const [cashiers, setCashiers] = useState([]);
  const [newCashier, setNewCashier] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [selectedCashier, setSelectedCashier] = useState(null);
  const [updateCashier, setUpdateCashier] = useState({
    email: '',
    password: '',
  });
  const [adminSettings, setAdminSettings] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    fetchCashiers();
  }, []);

  const fetchCashiers = async () => {
    try {
      const response = await axios.get('/api/cashiers'); // Replace with actual endpoint
      setCashiers(response.data);
    } catch (error) {
      console.error('Error fetching cashiers:', error);
    }
  };

  const createCashier = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/cashiers', newCashier); // Replace with actual endpoint
      setNewCashier({ name: '', email: '', password: '' });
      fetchCashiers();
    } catch (error) {
      console.error('Error creating cashier:', error);
    }
  };

  const updateCashierDetails = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/cashiers/${selectedCashier.id}`, updateCashier); // Replace with actual endpoint
      setSelectedCashier(null);
      setUpdateCashier({ email: '', password: '' });
      fetchCashiers();
    } catch (error) {
      console.error('Error updating cashier details:', error);
    }
  };

  const updateAdminSettings = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin', adminSettings); // Replace with actual endpoint
      setAdminSettings({ email: '', password: '' });
    } catch (error) {
      console.error('Error updating admin settings:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/5 bg-white p-5 shadow-md">
        <ul className="space-y-4">
          <li className="text-gray-600">Vendre</li>
          <li className="text-gray-600">Stock</li>
          <li className="text-gray-600">Fournisseur</li>
          <li className="text-gray-600">Historique des clients</li>
          <li className="font-bold text-teal-500">Settings</li>
        </ul>
      </aside>

      {/* if nkhdem b component i add brk <div ... */}

      <main className="w-4/5 p-10">
        <h1 className="text-2xl font-bold mb-5">Settings</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Manage Cashiers</h2>
          <form onSubmit={createCashier} className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded-md"
              value={newCashier.name}
              onChange={(e) =>
                setNewCashier({ ...newCashier, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded-md"
              value={newCashier.email}
              onChange={(e) =>
                setNewCashier({ ...newCashier, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border rounded-md"
              value={newCashier.password}
              onChange={(e) =>
                setNewCashier({ ...newCashier, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md"
            >
              Add
            </button>
          </form>

          <table className="w-full bg-white shadow-md rounded-md">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cashiers.map((cashier, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3">{cashier.name}</td>
                  <td className="p-3">{cashier.email}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCashier(cashier);
                        setUpdateCashier({
                          email: cashier.email,
                          password: '',
                        });
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedCashier && (
            <form onSubmit={updateCashierDetails} className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Edit Cashier: {selectedCashier.name}
              </h3>
              <input
                type="email"
                placeholder="New Email"
                className="p-2 border rounded-md mb-4 w-full"
                value={updateCashier.email}
                onChange={(e) =>
                  setUpdateCashier({ ...updateCashier, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="p-2 border rounded-md mb-4 w-full"
                value={updateCashier.password}
                onChange={(e) =>
                  setUpdateCashier({
                    ...updateCashier,
                    password: e.target.value,
                  })
                }
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded-md"
              >
                Update
              </button>
            </form>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
          <form onSubmit={updateAdminSettings} className="flex gap-4">
            <input
              type="email"
              placeholder="New Email"
              className="p-2 border rounded-md"
              value={adminSettings.email}
              onChange={(e) =>
                setAdminSettings({ ...adminSettings, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="p-2 border rounded-md"
              value={adminSettings.password}
              onChange={(e) =>
                setAdminSettings({ ...adminSettings, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md"
            >
              Update
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
