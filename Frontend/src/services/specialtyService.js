import axios from "../axios";


const createSpecialty = (data) => {
    return axios.post('/api/create-specialty', data)
}
export {
    createSpecialty,
}