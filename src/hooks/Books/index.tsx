import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

//Tools
import { removeEmptyValues } from "@/utils/tool";

//Services
import { BookService } from "@/services";

//Interface
import { BookResponse } from "@/interface/Books";
import { useAlert } from "@/context/Alert";




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


export const AddBook = () => {
    const [loader, setLoader] = useState(false);
    const { showAlert } = useAlert(); // Alert hook

    const submit = async (body: any) => {
        setLoader(true);

        try {
            const res = await BookService.addBook(body);
            showAlert('success', 'Book added successfully');
            return true;
        } catch (error) {
            setLoader(false);
            showAlert('error', error.response.data.error);
        }
    };

    return { submit, loader };
};
export const EditBook = () => {
    const [loader, setLoader] = useState(false);
    const { showAlert } = useAlert(); // Alert hook

    const submit = async (id: any, body: any) => {
        setLoader(true);

        try {
            const res = await BookService.editBook(id, body);
            showAlert('success', 'Book Edit successfully');
            return true;
        } catch (error) {
            setLoader(false);
            showAlert('error', error.response.data.error);
        }
    };

    return { submit, loader };
};
export const deleteBook = () => {
    const [loader, setLoader] = useState(false);
    const { showAlert } = useAlert(); // Alert hook

    const submit = async (id: any) => {
        setLoader(true);

        try {
            const res = await BookService.deleteBook(id);
            showAlert('success', 'Book deleted successfully');
            return true;
        } catch (error) {
            setLoader(false);
            showAlert('error', error.response.data.error);
        }
    };

    return { submit, loader };
};