import axios from "../axios";

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUser = (id) => {
    return axios.get(`/api/get-all-user?id=${id}`)
}

const createUserService = (data) => {
    return axios.post('/api/create-user', data)
}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

export { handleLoginAPI, getAllUser, createUserService, deleteUserService, editUserService }