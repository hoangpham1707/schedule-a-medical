import db from "../models"

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.imageBase64 || !data.name || !data.address || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create Clinic Success!',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Find All Clinic Success!',
                data: data
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getDetailClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                });
                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: id },
                        attributes: ['doctorId']
                    })

                    data.doctorClinic = doctorClinic;
                } else data = {};

                resolve({
                    errCode: 0,
                    errMessage: 'Find All Specialty Success!',
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinic: getDetailClinic

}