import axios from "../axios";

const getTopDoctor = (limit) => {
    return axios.get(`api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get('/api/get-all-doctor')
}
const saveInfoDoctor = (data) => {
    return axios.post('/api/save-info-doctor', data)
}
const detailDoctor = (id) => {
    return axios.get(`api/get-detail-doctor?id=${id}`)
}
const saveBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const detailExtraDoctor = (doctorId) => {
    return axios.get(`/api/get-detail-extra-doctor?doctorId=${doctorId}`)
}
const profileDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor?doctorId=${doctorId}`)
}
export {
    getTopDoctor, getAllDoctors,
    saveInfoDoctor, detailDoctor,
    saveBulkSchedule, getScheduleDoctorByDate,
    detailExtraDoctor, profileDoctor,
}