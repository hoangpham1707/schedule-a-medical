import patientService from '../services/patientService'

let bookDoctor = async (req, res) => {
    try {
        let bookDoctor = await patientService.bookDoctor(req.body);
        return res.status(200).json(bookDoctor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let verifyBookDoctor = async (req, res) => {
    try {
        let bookDoctor = await patientService.verifyBookDoctor(req.body);
        return res.status(200).json(bookDoctor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    bookDoctor: bookDoctor,
    verifyBookDoctor: verifyBookDoctor
}