import { useState, useMemo } from 'react';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddBookForm from '@/features/Books/AddBook';
import { deleteBook, getAllBooks } from '@/hooks/Books';
import { useAlert } from '@/context/Alert';

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
  const deleteBookHook = deleteBook(); // Fetch books data
  const { showAlert } = useAlert(); // Alert hook

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleOnSubmit = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      const result = await deleteBookHook.submit(id);
      refetch()
    }
  };

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
      <RiDeleteBin6Line
        className='cursor-pointer text-red-500'
        size={20}
        onClick={() => handleDelete(book.id)}
      />
    </div>
  ]), [books]);

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
