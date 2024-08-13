// hooks/Transfers.ts
import { useState, useEffect } from 'react';
import { TransferService } from '@/services';
import { useAlert } from '@/context/Alert';
import { TransferResponse } from '@/interface/Transfer';
import { removeEmptyValues } from '@/utils/tool';

export const useTransfers = () => {
    const [data, setData] = useState<TransferResponse>([]);
    const [loading, setLoading] = useState(true);
    const [refetchCounter, setRefetchCounter] = useState(0);
    const [params, setparams] = useState<any>(
    );
    const { showAlert } = useAlert();

    const refetch = () => setRefetchCounter(prev => prev + 1);

    useEffect(() => {
        setLoading(true);
        TransferService.getAllTransfer(removeEmptyValues(params))
            .then(res => setData(res))
            .catch(error => showAlert('error', error?.response?.data?.error))
            .finally(() => setLoading(false));
    }, [refetchCounter,params]);

    return { data, refetch, loading,setparams };
};

export const useCreateTransfer = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (checkoutData: any) => {
        setLoading(true);
        try {
            await TransferService.createTransfer(checkoutData);
            showAlert('success', 'Transfer created successfully');
            return true;
        } catch (error) {
            showAlert('error', error?.response?.data?.error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading };
};
export const useUpdateTransfer = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id, checkoutData: any) => {
        setLoading(true);
        try {
            await TransferService.updateTransfer(id, checkoutData);
            showAlert('success', 'Transfer updated successfully');
            return true;
        } catch (error) {
            showAlert('error', error?.response?.data?.error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading };
};


export const useDeleteTransfer = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id: number) => {
        setLoading(true);
        try {
            await TransferService.deleteTransfer(id);
            showAlert('success', 'Transfer deleted successfully');
            return true;
        } catch (error) {
            showAlert('error', error?.response?.data?.error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading };
};
