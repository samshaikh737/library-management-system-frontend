import React, { useState } from 'react';

const BranchFilter = ({ onFilter }) => {
  // State for the filter inputs
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
    zipCode: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle filter form submission
  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  // Handle reset
  const handleReset = () => {
    setFilters({
      name: '',
      city: '',
      state: '',
      address: '',
      zipCode: ''
    });
    onFilter({
      name: '',
      city: '',
      state: '',
      address: '',
      zipCode: ''
    });
  };

  return (
    <form onSubmit={handleFilter} className="flex space-x-4 p-4 bg-white rounded-lg shadow-lg flex-wrap">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by city"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={filters.state}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by state"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Zipcode</label>
        <input
          type="text"
          name="zipCode"
          value={filters.zipCode}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by zipCode"
        />
      </div>
      <div className="flex space-x-4 items-end">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Filter
        </button>
        <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-600 text-white rounded-md">
          Reset
        </button>
      </div>
    </form>
  );
};

export default BranchFilter;
