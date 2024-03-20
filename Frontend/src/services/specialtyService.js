import axios from "../axios";


const createSpecialty = (data) => {
    return axios.post('/api/create-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}
const getDetailSpecialty = (data) => {
    return axios.get(`/api/get-detail-specialty?id=${data.id}&location=${data.location}`)
}
export {
    createSpecialty, getAllSpecialty, getDetailSpecialty
}