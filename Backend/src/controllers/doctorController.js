import doctorService from '../services/doctorService'

let getTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let doctors = await doctorService.getTopDoctor(+limit);
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctor();
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let saveInfoDoctor = async (req, res) => {
    try {
        let infoDoctor = await doctorService.saveInfoDoctor(req.body);
        return res.status(200).json(infoDoctor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailDoctor = async (req, res) => {
    try {
        let infoDoctor = await doctorService.getDetailDoctor(req.query.id);
        return res.status(200).json(infoDoctor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let dataSchedule = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(dataSchedule);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getScheduleDoctorByDate = async (req, res) => {
    try {
        let dataScheduleByDate = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(dataScheduleByDate);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getDetailExtraDoctor = async (req, res) => {
    try {
        let infoDoctor = await doctorService.getDetailExtraDoctor(req.query.doctorId);
        return res.status(200).json(infoDoctor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getProfileDoctor = async (req, res) => {
    try {
        let infoDoctor = await doctorService.getProfileDoctor(req.query.doctorId);
        return res.status(200).json(infoDoctor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getDetailExtraDoctor: getDetailExtraDoctor,
    getProfileDoctor: getProfileDoctor,
}