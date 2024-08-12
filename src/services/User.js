import fetcher from '@/helper/fetcher';


const getAllUser = (params) => {
    return fetcher.get(`/users`, {
        params
    }).then(response => {
        return response.data;
    })
}
const addUser = (body) => {
    return fetcher.post(`/users`, body).then(response => {
        return response.data;
    })
}
const editUser = (id, body) => {
    return fetcher.put(`/users/${id}`, body).then(response => {
        return response.data;
    })
}
const deleteUser = (id) => {
    return fetcher.delete(`/users/${id}`,).then(response => {
        return response.data;
    })
}

export const UserService = {
    getAllUser,
    addUser,
    editUser,
    deleteUser
}