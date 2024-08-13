// features/Users/AddUser.tsx
import React, { useState } from 'react';
import { useAddUser } from '@/hooks/User';
import Loader from '@/components/Loader';
import { getAllBranch } from '@/hooks/Branch';

interface AddUserFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose, onSubmit }) => {
  const { data: branches } = getAllBranch();


  const { submit, loading } = useAddUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'member',
    branchId: '',
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
      <h2 className="text-lg font-semibold">Add User</h2>
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
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
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
      <div>
        <label htmlFor="role" className="block text-gray-700">Type</label>
        <select
          id="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="member">Member</option>
          <option value="librarian">Librarian</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Branch</label>
        <select
          id="branchId"
          value={formData.branchId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select branch</option>
          {branches && branches.map((branch: any) => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
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

export default AddUserForm;
