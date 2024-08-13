import { useState, useMemo } from 'react';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddBookForm from '@/features/Books/AddBook';
import EditBookForm from '@/features/Books/EditBook'; // Adjust path as needed
import { deleteBook, getAllBooks } from '@/hooks/Books';
import { useAlert } from '@/context/Alert';
import BookFilter from './BookFilter';

const headers = [
  'Title',
  'Author',
  'Genre',
  'Quantity',
  'Current Branch',
  // 'Status',
  'ISBN',
  'Created At',
  'Actions',
];

const Home = () => {
  const { data: books, refetch, setparams } = getAllBooks(); // Fetch books data
  const deleteBookHook = deleteBook(); // Hook for deleting books
  const { showAlert } = useAlert(); // Alert hook

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Modal state for adding book
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state for editing book
  const [selectedBook, setSelectedBook] = useState<any>(null); // State for the selected book

  const handleOnSubmit = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    refetch();
  };

  const handleEdit = (book: any) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      const result = await deleteBookHook.submit(id);
      if (result) {
        refetch();
      } else {
        showAlert('Failed to delete the book.');
      }
    }
  };

  const rows = useMemo(() => books?.map(book => [
    book.title,
    book.author,
    book.genre,
    book.quantity,
    book.currentBranch,
    // book.status,
    book.isbn,
    moment(book.createdAt).format('L'), // Format date
    <div className='flex items-center justify-around'>
      <MdModeEdit
        className='cursor-pointer'
        size={20}
        onClick={() => handleEdit(book)} // Open edit modal with selected book
      />
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
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>

      {/* Add Book Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddBookForm onClose={() => setIsAddModalOpen(false)} onSubmit={handleOnSubmit} />
      </Modal>

      {/* Edit Book Modal */}
      {selectedBook && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <EditBookForm
            defaultData={selectedBook}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleOnSubmit}
          />
        </Modal>
      )}

      <BookFilter onFilter={setparams} />
      <div className="mt-5"></div>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default Home;
