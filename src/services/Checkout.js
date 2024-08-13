import fetcher from '@/helper/fetcher';


const getAllCheckout = (params) => {
    return fetcher.get(`/checkouts`, {
        params
    }).then(response => {
        return response.data;
    })
}
const addCheckout = (body) => {
    return fetcher.post(`/checkouts`, body).then(response => {
        return response.data;
    })
}
const returnCheckout = (id, body) => {
    return fetcher.post(`/checkouts/return/${id}`, body).then(response => {
        return response.data;
    })
}
const deleteCheckout = (id) => {
    return fetcher.delete(`/checkouts/${id}`,).then(response => {
        return response.data;
    })
}

export const CheckoutService = {
    getAllCheckout,
    addCheckout,
    returnCheckout,
    deleteCheckout
}