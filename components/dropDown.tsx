import { useState, useEffect } from "react";

interface DropdownProps {
  onSelect: (filter: string) => void;
  selectedFilter: string;
}

const Dropdown = ({ onSelect, selectedFilter }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Effect to reset dropdown visibility when selectedFilter changes
  useEffect(() => {
    if (selectedFilter) {
      setIsOpen(false); // Close dropdown when a selection is made
    }
  }, [selectedFilter]);

  return (
    <div className="relative inline-block text-left ml-5">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 text-gray-700 font-medium px-4 py-2 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-between w-56"
      >
        Sélectionner le temps
        <svg
          className="ml-2 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <li>
            <button
              className={`block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 ${
                selectedFilter === "all" ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onSelect("all");
              }}
            >
              Tous
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 ${
                selectedFilter === "today" ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onSelect("today");
              }}
            >
              Aujourd'hui
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 ${
                selectedFilter === "thisWeek" ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onSelect("thisWeek");
              }}
            >
              Cette semaine
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 ${
                selectedFilter === "thisMonth" ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onSelect("thisMonth");
              }}
            >
              Ce mois
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
