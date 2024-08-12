import fetcher from '@/helper/fetcher';


const getAllBranch = (params) => {
    return fetcher.get(`/branches`, {
        params
    }).then(response => {
        return response.data;
    })
}

export const BranchService = {
    getAllBranch
}