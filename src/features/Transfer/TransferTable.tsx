// features/Transfers/TransferTable.tsx
import { useState, useMemo } from 'react';
import moment from 'moment';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiDeleteBin6Line } from 'react-icons/ri';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddTransferForm from './AddTransfer';
import EditTransferForm from './EditTransfer';
import { useTransfers, useDeleteTransfer } from '@/hooks/Transfer';
import { useAlert } from '@/context/Alert';
import { MdModeEdit } from 'react-icons/md';
// import TransferFilter from './TransferFilter';

const headers = [
  'Book',
  'From Branch',
  'To Branch',
  'Quantity',
  'Transfer Date',
  'Actions',
];

const TransferTable = () => {
  const { data: transfers, refetch, setparams } = useTransfers();
  const { submit: deleteTransfer } = useDeleteTransfer();
  const { showAlert } = useAlert();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTransferData, setEditTransferData] = useState<any>(null);

  const handleOnSubmit = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    refetch();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this transfer?');
    if (confirmed) {
      const success = await deleteTransfer(id);
      if (success) refetch();
    }
  };
  const handleEdit = (transfer: any) => {
    setEditTransferData(transfer);
    setIsEditModalOpen(true);
};

  const rows = useMemo(() => transfers?.map(transfer => [
    transfer.Book.title,
    transfer.fromBranch.name,
    transfer.toBranch.name,
    transfer.quantity,
    moment(transfer.transferDate).format('L LT'),
    <div className='flex items-center justify-around'>
      <MdModeEdit
        className='cursor-pointer'
        size={20}
        onClick={() => handleEdit(transfer)}
      />
      <RiDeleteBin6Line
        className='cursor-pointer text-red-500'
        size={20}
        onClick={() => handleDelete(transfer.id)}
      />
    </div>
  ]), [transfers]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Transfers</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Transfer
        </button>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddTransferForm onClose={() => setIsAddModalOpen(false)} onSubmit={handleOnSubmit} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editTransferData && (
          <EditTransferForm
            defaultData={editTransferData}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleOnSubmit}
          />
        )}
      </Modal>

      {/* <TransferFilter onFilter={setparams} /> */}
      <div className="mt-5"></div>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default TransferTable;
