import allCodeService from '../services/allCodeService';


let getAllCode = async (req, res) => {
    try {
        let data = await allCodeService.getAll(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Err: ', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
    return res.send('ok');
}
module.exports = {
    getAllCode: getAllCode
}