// features/Checkouts/EditCheckout.tsx
import React, { useState, useEffect } from 'react';
import {  useReturnCheckout } from '@/hooks/Checkout';
import Loader from '@/components/Loader';


interface EditCheckoutFormProps {
  defaultData: any;
  onClose: () => void;
  onSubmit: () => void;
}

const EditCheckoutForm: React.FC<EditCheckoutFormProps> = ({ defaultData, onClose, onSubmit }) => {
  const { submit, loading } = useReturnCheckout();

  const [formData, setFormData] = useState({
    returnDate: '',
    status: 'returned',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submit(defaultData.id, formData);
    if (success) {
      onSubmit();
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
      <h2 className="text-lg font-semibold">Edit Checkout</h2>

      <div>
        <label htmlFor="returnDate" className="block text-gray-700">Return Date</label>
        <input
          id="returnDate"
          type="datetime-local"
          value={formData.returnDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-gray-700">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
          disabled
        >
          <option value="checked_out">Checked Out</option>
          <option value="returned">Returned</option>
        </select>
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

export default EditCheckoutForm;
