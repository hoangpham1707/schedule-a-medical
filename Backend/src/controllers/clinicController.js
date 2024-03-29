import specialtyClinic from '../services/clinicService'

let createClinic = async (req, res) => {
    try {
        let data = await specialtyClinic.createClinic(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let data = await specialtyClinic.getAllClinic();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getDetailClinic = async (req, res) => {
    try {
        let data = await specialtyClinic.getDetailClinic(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinic: getDetailClinic
}