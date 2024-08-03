import React, { useState } from "react";
import jsonData from "./data.json"; // Import JSON data

function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    // Filter the items based on the search query
    const filtered = jsonData.filter((item) =>
      item.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <h2>Search Filter</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFilter;
