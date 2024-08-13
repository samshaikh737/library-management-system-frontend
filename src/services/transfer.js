import fetcher from '@/helper/fetcher';


const getAllTransfer = (params) => {
    return fetcher.get(`/transfer`, {
        params
    }).then(response => {
        return response.data;
    })
}
const createTransfer = (body) => {
    return fetcher.post(`/transfer`, body).then(response => {
        return response.data;
    })
}
const updateTransfer = (id,body) => {
    return fetcher.put(`/transfer/${id}`, body).then(response => {
        return response.data;
    })
}
const deleteTransfer = (id) => {
    return fetcher.delete(`/transfer/${id}`,).then(response => {
        return response.data;
    })
}

export const TransferService = {
    getAllTransfer,
    createTransfer,
    updateTransfer,
    deleteTransfer
}