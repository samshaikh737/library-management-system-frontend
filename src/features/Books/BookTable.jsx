
import Table from '@/components/Table';
import moment from 'moment';

//Icons
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

//Hooks
import { getAllBooks } from '@/hooks/Books';


const Home = () => {
  const books = getAllBooks()

  const rows = books.data.map(book => [
    book.title,
    book.author,
    book.genre,
    book.quantity,
    book.currentBranch,
    book.status,
    book.isbn,
    moment(book.createdAt).format('l'),
    <div className='flex items-center justify-around'>
      <MdModeEdit className='cursor-pointer' size={"20"} />
      <RiDeleteBin6Line className='cursor-pointer ' color='red' size={"20"} />
    </div>
  ]);

  return (
    <div>
      <h2 class="text-xl font-semibold mb-5">Books</h2>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

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
export default Home;

