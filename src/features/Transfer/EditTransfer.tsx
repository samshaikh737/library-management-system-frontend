// features/Transfers/AddTransfer.tsx
import React, { useState, useEffect } from 'react';
import { useUpdateTransfer } from '@/hooks/Transfer';
import Loader from '@/components/Loader';
import { getAllBooks } from '@/hooks/Books';
import { getAllBranch } from '@/hooks/Branch';

interface AddTransferFormProps {
  defaultData: any;
  onClose: () => void;
  onSubmit: () => void;
}

const AddTransferForm: React.FC<AddTransferFormProps> = ({ defaultData, onClose, onSubmit }) => {
  const { submit, loading } = useUpdateTransfer();
  const { data: books, loading: booksLoading } = getAllBooks();
  const { data: branches } = getAllBranch();

  const [formData, setFormData] = useState({
    title: '',
    fromBranchId: '',
    toBranchId: '',
    quantity: '',
  });

  useEffect(() => {
    if (defaultData) {
      setFormData({
        title: defaultData.Book?.title,
        fromBranchId: defaultData.fromBranchId,
        toBranchId: defaultData.toBranchId,
        quantity: defaultData.quantity,
      });
    }
  }, [defaultData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submit(defaultData.id,formData);
    if (success) {
      onSubmit();
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
      <h2 className="text-lg font-semibold">Edit Transfer</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Book</label>
        <select
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select Book</option>
          {booksLoading ? (
            <option>Loading...</option>
          ) : (
            books.map(book => (
              <option key={book.id} value={book.title}>{book.title}</option>
            ))
          )}
        </select>
      </div>
      <div>
        <label htmlFor="fromBranchId" className="block text-gray-700">From Branch</label>
        <select
          id="fromBranchId"
          value={formData.fromBranchId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select From Branch</option>
          {branches && branches.map(branch => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="toBranchId" className="block text-gray-700">To Branch</label>
        <select
          id="toBranchId"
          value={formData.toBranchId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select To Branch</option>
          {branches && branches.map(branch => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
        <input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>

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

export default AddTransferForm;
