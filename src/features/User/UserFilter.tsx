import { getAllBranch } from '@/hooks/Branch';
import React, { useState } from 'react';

const UserFilter = ({ onFilter }) => {
  const { data: branches } = getAllBranch();

  // State for the filter inputs
  const [filters, setFilters] = useState({
    branchId: '',
    name: '',
    email: '',
    phone: ''
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
      branchId: '',
      name: '',
      email: '',
      phone: ''
    });
    onFilter({
      branchId: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  return (
    <form onSubmit={handleFilter} className="flex space-x-4 p-4 bg-white rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Branch</label>
        <select
          name="branchId"
          value={filters.branchId}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select branch</option>
          {branches && branches.map((branch: any) => (
            <option key={branch.name} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </div>

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
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={filters.phone}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by phone"
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

export default UserFilter;
