import { useState, useMemo } from 'react';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import AddBranchForm from '@/features/Branch/AddBranch';
import EditBranchForm from '@/features/Branch/EditBranch';
import { getAllBranch, deleteBranch } from '@/hooks/Branch';
import BranchFilter from './BranchFilter';

const headers = [
    'Name',
    'City',
    'State',
    'Zip Code',
    'Phone',
    'Address',
    'Created At',
    'Actions',
];

const Branches = () => {
    const { data: branches, refetch, setparams } = getAllBranch();
    const deleteBranchHook = deleteBranch();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<any>(null);

    const handleOnSubmit = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        refetch();
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this branch?');
        if (confirmed) {
            await deleteBranchHook.submit(id);
            refetch();
        }
    };

    const handleEdit = (branch: any) => {
        setSelectedBranch(branch);
        setIsEditModalOpen(true);
    };

    const rows = useMemo(() => branches?.map(branch => [
        branch.name,
        branch.city,
        branch.state,
        branch.zipCode,
        branch.phone,
        branch.address,
        moment(branch.createdAt).format('L'),
        <div className='flex items-center justify-around'>
            <MdModeEdit
                className='cursor-pointer'
                size={20}
                onClick={() => handleEdit(branch)}
            />
            <RiDeleteBin6Line
                className='cursor-pointer text-red-500'
                size={20}
                onClick={() => handleDelete(branch.id)}
            />
        </div>
    ]), [branches]);

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Branch</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                >
                    Add Branch
                </button>
            </div>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <AddBranchForm onClose={() => setIsAddModalOpen(false)} onSubmit={handleOnSubmit} />
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <EditBranchForm
                    defaultData={selectedBranch}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleOnSubmit}
                />
            </Modal>

            <BranchFilter onFilter={setparams} />
            <div className="mt-5"></div>
            <Table headers={headers} rows={rows} />
        </div>
    );
};

export default Branches;
