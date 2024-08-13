
// features/Checkouts/AddCheckout.tsx
import React, { useState, useEffect } from 'react';
import { useCreateCheckout } from '@/hooks/Checkout';
import Loader from '@/components/Loader';
import { useUsers } from '@/hooks/User';
import { getAllBooks } from '@/hooks/Books';

interface AddCheckoutFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const AddCheckoutForm: React.FC<AddCheckoutFormProps> = ({ onClose, onSubmit }) => {
  const { submit, loading } = useCreateCheckout();
  const { data: users, loading: usersLoading } = useUsers();
  const { data: books, loading: booksLoading } = getAllBooks();

  const [formData, setFormData] = useState({
    userId: '',
    bookId: '',
    checkoutDate: '',
    // returnDate: '',
    status: 'checked_out',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submit(formData);
    if (success) {
      onSubmit();
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
      <h2 className="text-lg font-semibold">Add Checkout</h2>
      <div>
        <label htmlFor="userId" className="block text-gray-700">User</label>
        <select
          id="userId"
          value={formData.userId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select User</option>
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
        <label htmlFor="bookId" className="block text-gray-700">Book</label>
        <select
          id="bookId"
          value={formData.bookId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select Book</option>
          {booksLoading ? (
            <option>Loading...</option>
          ) : (
            books.map(book => (
              <option key={book.id} value={book.id}>{book.title}</option>
            ))
          )}
        </select>
      </div>
      <div>
        <label htmlFor="checkoutDate" className="block text-gray-700">Checkout Date</label>
        <input
          id="checkoutDate"
          type="datetime-local"
          value={formData.checkoutDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      {/* <div>
        <label htmlFor="returnDate" className="block text-gray-700">Return Date</label>
        <input
          id="returnDate"
          type="datetime-local"
          value={formData.returnDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div> */}
      {/* <div>
        <label htmlFor="status" className="block text-gray-700">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="checked_out">Checked Out</option>
          <option value="returned">Returned</option>
        </select>
      </div> */}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        {loading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default AddCheckoutForm;
