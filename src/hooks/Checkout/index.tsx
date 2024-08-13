// hooks/Checkouts.ts
import { useState, useEffect } from 'react';
import { CheckoutService } from '@/services';
import { useAlert } from '@/context/Alert';
import { CheckoutResponse } from '@/interface/Checkout';
import { removeEmptyValues } from '@/utils/tool';

export const useCheckouts = () => {
    const [data, setData] = useState<CheckoutResponse>([]);
    const [loading, setLoading] = useState(true);
    const [refetchCounter, setRefetchCounter] = useState(0);
    const [params, setparams] = useState<any>(
    );
    const { showAlert } = useAlert();

    const refetch = () => setRefetchCounter(prev => prev + 1);

    useEffect(() => {
        setLoading(true);
        CheckoutService.getAllCheckout(removeEmptyValues(params))
            .then(res => setData(res))
            .catch(error => showAlert('error', error.message))
            .finally(() => setLoading(false));
    }, [refetchCounter,params]);

    return { data, refetch, loading,setparams };
};

export const useCreateCheckout = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (checkoutData: any) => {
        setLoading(true);
        try {
            await CheckoutService.addCheckout(checkoutData);
            showAlert('success', 'Checkout created successfully');
            return true;
        } catch (error) {
            showAlert('error', error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading };
};

export const useUpdateCheckout = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id: number, updateData: any) => {
        setLoading(true);
        try {
            await CheckoutService.editCheckout(id, updateData);
            showAlert('success', 'Checkout updated successfully');
            return true;
        } catch (error) {
            showAlert('error', error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading };
};

export const useDeleteCheckout = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id: number) => {
        setLoading(true);
        try {
            await CheckoutService.deleteCheckout(id);
            showAlert('success', 'Checkout deleted successfully');
            return true;
        } catch (error) {
            showAlert('error', error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading };
};
