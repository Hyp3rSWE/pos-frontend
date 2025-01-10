"use client";

import Sidebar from "@/components/sidebar";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { CahisherInter} from "../../types";


export default function SettingsPage() {
  const { userId, role } = useUser();

  const [cashiers, setCashiers] = useState([]);
  const [newCashier, setNewCashier] = useState({
    username: "",
    password: "",
  });
  const [selectedCashier, setSelectedCashier] = useState<CahisherInter>();
  const [updateCashier, setUpdateCashier] = useState({
    username: "",
    password: "",
  });
  const [adminSettings, setAdminSettings] = useState({
    username: "",
    password: "",
  });
  const [activeSection, setActiveSection] = useState("cashiers");
  const [editableFields, setEditableFields] = useState({});

  const addCashier = async (e: any) => {
    try {
      const response = await axios.post("http://localhost:3001/users", {
        user_role: "cashier",
        user_name: newCashier.username,
        user_pass: newCashier.password,
      });
      if (response.status === 200) {
        console.log("Success");
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const editCashierDetails = async (e: any) => {
    
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${selectedCashier?.user_id}`,
        {
          user_name: updateCashier.username,
          user_pass:
            updateCashier.password == "" ? null : updateCashier.password,
        },
      );

      if (response.status === 200) {
        console.log("updated !");
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const deleteCashier = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this cashier?")) {
      try {
        console.log(id);
        const response = await axios.delete(
          `http://localhost:3001/users/${id}`,
        );
        if (response.status === 200) {
          setCashiers(cashiers.filter((cashier:CahisherInter) => cashier.user_id !== id));
          console.log("Cashier deleted successfully!");
        }
      } catch (error: any) {
        console.error("Error deleting cashier:", error.message);
        alert("Failed to delete the cashier. Please try again.");
      }
    }
  };

  const confirmAdminUpdate = async () => {
    if (!adminSettings.username && !adminSettings.password) {
      alert("Please provide at least one field to update.");
      return;
    }

    console.log("---------------------------");
    console.log(userId);
    if (window.confirm("Are you sure you want to update admin settings?")) {
      try {
        if (!userId) {
          alert("You must be logged in to update admin settings.");
          return;
        }

        const updateData = {
            user_name:"",
            user_pass:""
        };
        if (adminSettings.username)
          updateData.user_name = adminSettings.username;
        if (adminSettings.password)
          updateData.user_pass = adminSettings.password;

        const response = await axios.put(
          `http://localhost:3001/users/${userId}`,
          updateData,
        );

        if (response.status === 200) {
          alert("Admin settings updated successfully!");
          setAdminSettings({ username: "", password: "" });
        }
      } catch (error: any) {
        console.error("Error updating admin settings:", error.message);
        alert("Failed to update admin settings.");
      }
    }
  };

  const handleChangeClick = (field: string) => {
    setEditableFields((prev) => ({
      ...prev,
    }));
  };

  const fetchCashiers = async () => {
    try {
      const query = await axios.get("http://localhost:3001/users/role/cashier");

      if (query.status == 200) {
        setCashiers(query.data);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar></Sidebar>

      <div className="flex flex-col w-full ml-52 mt-10">
        <div className="flex border-b border-gray-200 mb-4 ml-10">
          <button
            onClick={() => setActiveSection("cashiers")}
            className={`px-4 py-2 ${
              activeSection === "cashiers"
                ? "border-b-2 border-[#BEE7DB] text-[#2C5282]"
                : "text-gray-500"
            }`}
          >
            Manage Cashiers
          </button>
          <button
            onClick={() => setActiveSection("admin")}
            className={`px-4 py-2 ${
              activeSection === "admin"
                ? "border-b-2 border-[#BEE7DB] text-[#2C5282]"
                : "text-gray-500"
            }`}
          >
            Manage Admin Credentials
          </button>
        </div>

        <main className="w-4/5 p-10">
          <h1 className="text-2xl font-bold mb-5">Settings</h1>

          {activeSection === "cashiers" && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Manage Cashiers</h2>
              <form
                onSubmit={addCashier}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
              >
                <input
                  type="text"
                  placeholder="Username"
                  className="p-3 border rounded-md w-full"
                  value={newCashier.username}
                  onChange={(e) =>
                    setNewCashier({
                      ...newCashier,
                      username: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border rounded-md w-full"
                  value={newCashier.password}
                  onChange={(e) =>
                    setNewCashier({
                      ...newCashier,
                      password: e.target.value,
                    })
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
                    <th className="p-3">ID</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cashiers.map((cashier:CahisherInter) => (
                    <tr key={cashier.user_id} className="text-center border-t">
                      <td className="p-3">{cashier.user_name}</td>
                      <td className="p-3">{cashier.user_id}</td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCashier(cashier);
                            console.log(cashier);
                            setUpdateCashier({
                              username: cashier.user_name,
                              password: "",
                            });
                          }}
                          className="px-2 py-1 bg-blue-500 text-white rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCashier(cashier.user_id)}
                          className="px-2 py-1 bg-red-500 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {selectedCashier && (
                <form onSubmit={editCashierDetails} className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Edit Cashier: {selectedCashier.user_name}
                  </h3>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium mb-1"
                    >
                      New Username
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="username"
                        type="text"
                        placeholder="New Username"
                        className="p-3 border rounded-md w-full"
                        value={updateCashier.username}
                        onChange={(e) =>
                          setUpdateCashier({
                            ...updateCashier,
                            username: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleChangeClick("username")}
                        className="px-3 py-2 bg-teal-500 text-white rounded-md"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1"
                    >
                      New Password
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="password"
                        type="password"
                        placeholder="New Password"
                        className="p-3 border rounded-md w-full"
                        value={updateCashier.password}
                        onChange={(e) =>
                          setUpdateCashier({
                            ...updateCashier,
                            password: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleChangeClick("password")}
                        className="px-3 py-2 bg-teal-500 text-white rounded-md"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-500 text-white rounded-md"
                  >
                    Update
                  </button>
                </form>
              )}
            </section>
          )}

          {activeSection === "admin" && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>
              <form className="space-y-6 max-w-md">
                <div>
                  <label
                    htmlFor="adminUsername"
                    className="block text-lg font-medium mb-2"
                  >
                    New Username
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="adminUsername"
                      type="text"
                      placeholder="New Username"
                      className="p-4 border-2 rounded-md w-full text-lg"
                      value={adminSettings.username}
                      onChange={(e) =>
                        setAdminSettings({
                          ...adminSettings,
                          username: e.target.value,
                        })
                      }
                      required
                      disabled={false}
                    />
                    <button
                      type="button"
                      onClick={() => handleChangeClick("adminUsername")}
                      className="px-5 py-3 bg-teal-500 text-white rounded-md text-lg"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="adminPassword"
                    className="block text-lg font-medium mb-2"
                  >
                    New Password
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="adminPassword"
                      type="password"
                      placeholder="New Password"
                      className="p-4 border-2 rounded-md w-full text-lg"
                      value={adminSettings.password}
                      onChange={(e) =>
                        setAdminSettings({
                          ...adminSettings,
                          password: e.target.value,
                        })
                      }
                      required
                      disabled={false} // Enable if 'adminPassword' field is set to true
                    />
                    <button
                      type="button"
                      onClick={() => handleChangeClick("adminPassword")}
                      className="px-5 py-3 bg-teal-500 text-white rounded-md text-lg"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={confirmAdminUpdate}
                    className="px-6 py-3 bg-teal-500 text-white rounded-md text-lg"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setAdminSettings({
                        username: "",
                        password: "",
                      })
                    }
                    className="px-6 py-3 bg-gray-400 text-white rounded-md text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
