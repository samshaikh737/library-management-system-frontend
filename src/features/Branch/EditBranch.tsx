import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import { editBranch } from '@/hooks/Branch';

interface EditBranchFormProps {
  defaultData: any;
  onClose: () => void;
  onSubmit: () => void;
}

const EditBranchForm: React.FC<EditBranchFormProps> = ({ defaultData, onClose, onSubmit }) => {
  const { submit, loader } = editBranch();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  useEffect(() => {
    if (defaultData) {
      setFormData({
        name: defaultData.name,
        address: defaultData.address,
        city: defaultData.city,
        state: defaultData.state,
        zipCode: defaultData.zipCode,
        phone: defaultData.phone,
      });
    }
  }, [defaultData]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBranch = { ...formData };

    let res = await submit(defaultData.id, updatedBranch);
    if (res) {
      onSubmit();
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
      <h2 className="text-lg font-semibold">Edit Branch</h2>
      <div>
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-gray-700">Address</label>
        <input
          id="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-gray-700">City</label>
        <input
          id="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-gray-700">State</label>
        <input
          id="state"
          type="text"
          value={formData.state}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="zipCode" className="block text-gray-700">Zip Code</label>
        <input
          id="zipCode"
          type="text"
          value={formData.zipCode}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-gray-700">Phone</label>
        <input
          id="phone"
          type="text"
          value={formData.phone}
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
        {loader ? (
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

export default EditBranchForm;
