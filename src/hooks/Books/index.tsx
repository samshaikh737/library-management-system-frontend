import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

//Tools
import { removeEmptyValues } from "@/utils/tool";

//Services
import { BookService } from "@/services";

//Interface
import { BookResponse } from "@/interface/Books";




export const getAllBooks = () => {
    const [data, setdata] = useState<BookResponse[]>([]);

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

        BookService.getAllBooks(removeEmptyValues(params))
            .then((res) => {
                setdata(res);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refetchCounter, params]);

    return { data, refetch, loading, params, setparams, setPage };
};
