
import React, { useState, useEffect } from 'react';

import { getAllBooks } from '@/hooks/Books';
import { useUsers } from '@/hooks/User';

const CheckoutFilter = ({  onFilter }) => {
    const { data: users, loading: usersLoading } = useUsers();
    const { data: books, loading: booksLoading } = getAllBooks();

  const [filters, setFilters] = useState({
    userId: '',
    bookId: '',
    status: ''
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
      userId: '',
      bookId: '',
      status: ''
    });
    onFilter({
      userId: '',
      bookId: '',
      status: ''
    });
  };

  return (
    <form onSubmit={handleFilter} className="flex space-x-4 p-4 bg-white rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">User</label>
        <select
          name="userId"
          value={filters.userId}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select user</option>
          {usersLoading ? (
            <option>Loading...</option>
          ) : (
            users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))
          )}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Book</label>
        <select
          name="bookId"
          value={filters.bookId}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select status</option>
          <option value="checked_out">Checked Out</option>
          <option value="returned">Returned</option>
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

export default CheckoutFilter;
