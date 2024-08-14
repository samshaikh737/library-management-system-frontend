import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

//Tools
import { removeEmptyValues } from "@/utils/tool";

//Services
import { BranchService } from "@/services";

//Interface
import { BranchResponse } from "@/interface/Branch";
import { useAlert } from "@/context/Alert";




export const getAllBranch = () => {
    const [data, setdata] = useState<BranchResponse[]>([]);

    const [params, setparams] = useState<any>(
        {
            title: "",
        }
    );
    const [loading, setLoading] = useState<boolean>(true);

    // Add a state to track a refetch counter
    const [refetchCounter, setRefetchCounter] = useState<number>(0);

    // Define a function to trigger a re-fetch
    const refetch = () => {
        // Increment the refetch counter to force a re-fetch
        setRefetchCounter((prevCounter) => prevCounter + 1);
    };
    const setPage = (page: number) => {
        setparams({ ...params, page: page });
    };

    useEffect(() => {
        setLoading(true);

        BranchService.getAllBranches(removeEmptyValues(params))
            .then((res) => {
                setdata(res);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refetchCounter, params]);

    return { data, refetch, loading, params, setparams, setPage };
};


export const addBranch = () => {
    const [loader, setLoader] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (body: any) => {
        setLoader(true);
        try {
            await BranchService.addBranch(body);
            showAlert('success', 'Branch added successfully');
            return true;
        } catch (error) {
            setLoader(false);
            showAlert('error', error?.response?.data?.error);
        }
    };

    return { submit, loader };
};

export const editBranch = () => {
    const [loader, setLoader] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id: number, body: any) => {
        setLoader(true);
        try {
            await BranchService.editBranch(id, body);
            showAlert('success', 'Branch updated successfully');
            return true;
        } catch (error) {
            setLoader(false);
            showAlert('error', error?.response?.data?.error);
        }
    };

    return { submit, loader };
};


export const deleteBranch = () => {
    const [loader, setLoader] = useState(false);
    const { showAlert } = useAlert();

    const submit = async (id: number) => {
        setLoader(true);
        try {
            await BranchService.deleteBranch(id);
            showAlert('success', 'Branch deleted successfully');
            return true;
        } catch (error) {
            setLoader(false);
            showAlert('error', error?.response?.data?.error);
        }
    };

    return { submit, loader };
};