import fetcher from '@/helper/fetcher';


const getAllBranches = (params) => {
    return fetcher.get(`/branches`, {
        params
    }).then(response => {
        return response.data;
    })
}
const addBranch = (body) => {
    return fetcher.post(`/branches`, body).then(response => {
        return response.data;
    })
}
const editBranch = (id, body) => {
    return fetcher.put(`/branches/${id}`, body).then(response => {
        return response.data;
    })
}
const deleteBranch = (id) => {
    return fetcher.delete(`/branches/${id}`,).then(response => {
        return response.data;
    })
}

export const BranchService = {
    getAllBranches,
    addBranch,
    editBranch,
    deleteBranch
}