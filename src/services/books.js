import fetcher from '@/helper/fetcher';


const getAllBooks = (params) => {
    return fetcher.get(`/books`, {
        params
    }).then(response => {
        return response.data;
    })
}
const addBook = (body) => {
    return fetcher.post(`/books`, body).then(response => {
        return response.data;
    })
}


export const BookService = {
    getAllBooks,
    addBook
}