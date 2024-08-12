// features/Users/Users.tsx
import { useState, useMemo } from 'react';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddUserForm from './AddUser';
import EditUserForm from './EditUser';
import { useUsers, useDeleteUser } from '@/hooks/User';
import { useAlert } from '@/context/Alert';

const headers = [
  'Name',
  'Email',
  'Phone',
  'Role',
  'Created At',
  'Actions',
];

const Users = () => {
  const { data: users, refetch } = useUsers();
  const { submit: deleteUser } = useDeleteUser();
  const { showAlert } = useAlert();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<any>(null);

  const handleOnSubmit = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    refetch();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      const success = await deleteUser(id);
      if (success) refetch();
    }
  };

  const rows = useMemo(() => users?.map(user => [
    user.name,
    user.email,
    user.phone,
    user.role,
    moment(user.createdAt).format('L'),
    <div className='flex items-center justify-around'>
      <MdModeEdit
        className='cursor-pointer'
        size={20}
        onClick={() => {
          setEditUserData(user);
          setIsEditModalOpen(true);
        }}
      />
      <RiDeleteBin6Line
        className='cursor-pointer text-red-500'
        size={20}
        onClick={() => handleDelete(user.id)}
      />
    </div>
  ]), [users]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Users</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddUserForm onClose={() => setIsAddModalOpen(false)} onSubmit={handleOnSubmit} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {editUserData && (
          <EditUserForm
            defaultData={editUserData}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleOnSubmit}
          />
        )}
      </Modal>

      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default Users;
