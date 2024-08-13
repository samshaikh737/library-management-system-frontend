// features/Checkouts/Checkouts.tsx
import { useState, useMemo } from 'react';
import moment from 'moment';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiDeleteBin6Line } from 'react-icons/ri';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddCheckoutForm from './AddCheckout';
import EditCheckoutForm from './EditCheckout';
import { useCheckouts, useDeleteCheckout } from '@/hooks/Checkout';
import { useAlert } from '@/context/Alert';
import CheckoutFilter from './CheckoutFilter';

const headers = [
  'User',
  'Book',
  'Checkout Date',
  'Return Date',
  'Status',
  'Actions',
];

const Checkouts = () => {
  const { data: checkouts, refetch,setparams } = useCheckouts();
  const { submit: deleteCheckout } = useDeleteCheckout();
  const { showAlert } = useAlert();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCheckoutData, setEditCheckoutData] = useState<any>(null);

  const handleOnSubmit = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    refetch();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this checkout?');
    if (confirmed) {
      const success = await deleteCheckout(id);
      if (success) refetch();
    }
  };

  const rows = useMemo(() => checkouts?.map(checkout => [
    checkout.User.name,
    checkout.Book.title,
    moment(checkout.checkoutDate).format('L LT'),
    checkout.returnDate ? moment(checkout.returnDate).format('L LT'): '-',
    checkout.status,
    <div className='flex items-center justify-around'>
      {checkout.status != 'returned' && <IoCheckmarkDoneCircle
        className='cursor-pointer'
        size={20}
        onClick={() => {
          setEditCheckoutData(checkout);
          setIsEditModalOpen(true);
        }}
        title='Return'
      />}
      <RiDeleteBin6Line
        className='cursor-pointer text-red-500'
        size={20}
        onClick={() => handleDelete(checkout.id)}
      />
    </div>
  ]), [checkouts]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Checkouts</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Checkout
        </button>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddCheckoutForm onClose={() => setIsAddModalOpen(false)} onSubmit={handleOnSubmit} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editCheckoutData && (
          <EditCheckoutForm
            defaultData={editCheckoutData}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleOnSubmit}
          />
        )}
      </Modal>

      <CheckoutFilter onFilter={setparams} />
      <div className="mt-5"></div>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default Checkouts;
