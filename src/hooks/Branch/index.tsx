import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

//Tools
import { removeEmptyValues } from "@/utils/tool";

//Services
import { BranchService } from "@/services";

//Interface
import { BranchResponse } from "@/interface/Branch";




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

        BranchService.getAllBranch(removeEmptyValues(params))
            .then((res) => {
                setdata(res);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refetchCounter, params]);

    return { data, refetch, loading, params, setparams, setPage };
};
