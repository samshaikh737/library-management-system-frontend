// hooks/Users.ts
import { useState, useEffect } from "react";
import { UserService} from "@/services";
import { useAlert } from "@/context/Alert";
import { UserResponse } from "@/interface/User";
import { removeEmptyValues } from "@/utils/tool";

export const useUsers = () => {
    const [data, setData] = useState<UserResponse>([]);
    const [loading, setLoading] = useState(true);
    const [refetchCounter, setRefetchCounter] = useState(0);
    const [params, setparams] = useState<any>(
    );
    const { showAlert } = useAlert();

    const refetch = () => setRefetchCounter(prev => prev + 1);

    useEffect(() => {
        setLoading(true);
        UserService.getAllUser(removeEmptyValues(params))
            .then(res => setData(res))
            .catch(error => showAlert('error', error?.response?.data?.error))
            .finally(() => setLoading(false));
    }, [refetchCounter,params]);

    return { data, refetch, loading,setparams };
};

export const useAddUser = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (userData: any) => {
        setLoading(true);
        try {
            await UserService.addUser(userData);
            showAlert('success', 'User added successfully');
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

export const useEditUser = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id: number, userData: any) => {
        setLoading(true);
        try {
            await UserService.editUser(id, userData);
            showAlert('success', 'User edited successfully');
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

export const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id: number) => {
        setLoading(true);
        try {
            await UserService.deleteUser(id);
            showAlert('success', 'User deleted successfully');
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
