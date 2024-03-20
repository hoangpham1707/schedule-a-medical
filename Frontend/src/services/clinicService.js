import axios from "../axios";


const createClinic = (data) => {
    return axios.post('/api/create-clinic', data)
}
const getAllClinic = () => {
    return axios.get('/api/get-all-clinic')
}
const getDetailClinic = (data) => {
    return axios.get(`/api/get-detail-clinic?id=${data.id}`)
}
export {
    createClinic, getAllClinic, getDetailClinic
}