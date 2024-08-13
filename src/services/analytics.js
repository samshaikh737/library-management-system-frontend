import fetcher from '@/helper/fetcher';


const getAnalytics = (params) => {
    return fetcher.get(`/analytics`, {
        params
    }).then(response => {
        return response.data;
    })
}


export const AnalyticService = {
    getAnalytics
}