import { useState, useMemo } from 'react';
import moment from 'moment';

// Icons
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// Components
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddBookForm from '@/features/Books/AddBook';

// Hooks
import { getAllBooks } from '@/hooks/Books';

// Define table headers
const headers = [
  'Title',
  'Author',
  'Genre',
  'Quantity',
  'Current Branch',
  'Status',
  'ISBN',
  'Created At',
  'Actions',
];

const Home = () => {
  const { data: books, refetch } = getAllBooks(); // Fetch books data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Memoize table rows to optimize performance
  const rows = useMemo(() => books?.map(book => [
    book.title,
    book.author,
    book.genre,
    book.quantity,
    book.currentBranch,
    book.status,
    book.isbn,
    moment(book.createdAt).format('L'), // Format date
    <div className='flex items-center justify-around'>
      <MdModeEdit className='cursor-pointer' size={20} />
      <RiDeleteBin6Line className='cursor-pointer text-red-500' size={20} />
    </div>
  ]), [books]);

  const handleOnSubmit = () => {
    setIsModalOpen(false);
    refetch()
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Books</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddBookForm onClose={() => setIsModalOpen(false)} onSubmit={handleOnSubmit} />
      </Modal>

      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default Home;
