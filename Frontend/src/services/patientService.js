import axios from "../axios";


const PatientBookDoctor = (data) => {
    return axios.post('/api/patient-book-doctor', data)
}
const VerifyBookDoctor = (data) => {
    return axios.post('/api/verify-book-doctor', data)
}
export {
    PatientBookDoctor, VerifyBookDoctor
}