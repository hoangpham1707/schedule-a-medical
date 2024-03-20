import db from "../models"

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.imageBase64 || !data.name || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create Specialty Success!',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Find All Specialty Success!',
                data: data
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getDetailSpecialty = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                });
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: id },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: id, provinceId: location },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialty: getDetailSpecialty,
}