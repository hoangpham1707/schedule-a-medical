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


module.exports = {
    createClinic: createClinic,
}