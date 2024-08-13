import React, { useState } from 'react';
import Loader from '@/components/Loader';
import { getAllBranch } from '@/hooks/Branch';
import { AddBook } from '@/hooks/Books';

interface AddBookFormProps {
  onClose: () => void;
  onSubmit: (book: any) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose, onSubmit }) => {
  const { data: branches } = getAllBranch();
  const { submit, loader } = AddBook();

  // Single state object for form fields
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    quantity: '',
    currentBranch: '',
    status: 'available',
    isbn: '',
  });

  // Genres array
  const genres = [
    'fiction',
    'non-fiction',
    'fantasy',
    'mystery',
    'thriller',
    'romance',
    'historical',
    'science-fiction'
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      quantity: Number(formData.quantity),
      currentBranch: formData.currentBranch,
      branchId: branches.find((i)=> i.name == formData.currentBranch)?.id,
      status: formData.status,
      isbn: formData.isbn,
    };

    let res = await submit(newBook);
    if (!res) return;

    onSubmit(newBook);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
      <h2 className="text-lg font-semibold">Add Book</h2>
      <div>
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-gray-700">Author</label>
        <input
          id="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
        <input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="isbn" className="block text-gray-700">ISBN</label>
        <input
          id="isbn"
          type="text"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        />
      </div>
      <div>
        <label htmlFor="genre" className="block text-gray-700">Genre</label>
        <select
          id="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select Genre</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="currentBranch" className="block text-gray-700">Current Branch</label>
        <select
          id="currentBranch"
          value={formData.currentBranch}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="">Select Branch</option>
          {branches && branches.map((branch: any) => (
            <option key={branch.name} value={branch.name}>{branch.name}</option>
          ))}
        </select>
      </div>
      {/* <div>
        <label htmlFor="status" className="block text-gray-700">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
        >
          <option value="available">Available</option>
          <option value="checked_out">Checked Out</option>
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

export default AddBookForm;
