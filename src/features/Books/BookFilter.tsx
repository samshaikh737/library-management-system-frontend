import { getAllBranch } from '@/hooks/Branch';
import React, { useState, useEffect } from 'react';

const BookFilter = ({ onFilter }) => {
  // State for the filter inputs
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    genre: '',
    currentBranch: ''
  });

  const { data: branches } = getAllBranch();

  // Genres array
  const genres = [
    'fiction',
    'non-fiction',
    'fantasy',
    'mystery',
    'thriller',
    'romance',
    'historical',
    'science-fiction',
  ];


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
      title: '',
      author: '',
      genre: '',
      currentBranch: ''
    });
    onFilter({
      title: '',
      author: '',
      genre: '',
      currentBranch: ''
    });
  };

  return (
    <form onSubmit={handleFilter} className="flex space-x-4 p-4 bg-white rounded-lg shadow-lg flex-wrap">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          name="author"
          value={filters.author}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search by author"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <select
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Branch</label>
        <select
          name="currentBranch"
          value={filters.currentBranch}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select branch</option>
          {branches && branches.map((branch: any) => (
            <option key={branch.name} value={branch.name}>{branch.name}</option>
          ))}
        </select>
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

export default BookFilter;
