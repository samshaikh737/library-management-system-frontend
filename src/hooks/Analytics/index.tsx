import { useEffect, useState } from "react";

//Services
import { AnalyticService } from "@/services";

export const getAnalytics = () => {
    const [data, setdata] = useState({});

    const [loading, setLoading] = useState<boolean>(true);

    // Add a state to track a refetch counter
    const [refetchCounter, setRefetchCounter] = useState<number>(0);

    // Define a function to trigger a re-fetch
    const refetch = () => {
        // Increment the refetch counter to force a re-fetch
        setRefetchCounter((prevCounter) => prevCounter + 1);
    };

    useEffect(() => {
        setLoading(true);

        AnalyticService.getAnalytics()
            .then((res) => {
                setdata(res);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refetchCounter]);

    return { data, refetch, loading };
};
