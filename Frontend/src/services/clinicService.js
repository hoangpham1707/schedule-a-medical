import axios from "../axios";


const createClinic = (data) => {
    return axios.post('/api/create-clinic', data)
}

export {
    createClinic
}