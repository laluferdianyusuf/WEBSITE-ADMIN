import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

export default function SearchBar({ onSearch, placeholder = "Cari..." }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative flex items-center text-xs">
      <FaSearch className="absolute left-3 text-gray-600" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-gray-600"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
