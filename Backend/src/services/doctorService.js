import { where } from "sequelize";
import db from "../models";
import _ from 'lodash';
require('dotenv').config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.AllCode, as: 'positionData', attributes: ['value_Vi', 'value_En'] },
                    { model: db.AllCode, as: 'genderData', attributes: ['value_Vi', 'value_En'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                errMessage: 'Get Top Doctor Success!',
                data: doctors
            })

        } catch (error) {
            reject(error);
        }
    })

}
let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password', 'image']
                },
                // raw: true,
                // nest: true
            })
            resolve({
                errCode: 0,
                errMessage: 'Get Top Doctor Success!',
                data: doctors
            })

        } catch (error) {
            reject(error);
        }
    })
}
let saveInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action
                || !inputData.selectedPrice || !inputData.selectedPayment || !inputData.selectedProvince
                || !inputData.nameClinic || !inputData.addressClinic || !inputData.note
                || !inputData.specialtyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId
                    });
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    // console.log('markdown:', doctorMarkdown);
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.specialtyId = inputData.specialtyId;
                        doctorMarkdown.clinicId = inputData.clinicId;

                        await doctorMarkdown.save();
                    }
                }

                let doctorInfo = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    },
                    raw: false
                })

                if (doctorInfo) {
                    //update
                    doctorInfo.priceId = inputData.selectedPrice;
                    doctorInfo.paymentId = inputData.selectedPayment;
                    doctorInfo.provinceId = inputData.selectedProvince;
                    doctorInfo.addressClinic = inputData.addressClinic;
                    doctorInfo.nameClinic = inputData.nameClinic;
                    doctorInfo.note = inputData.note;
                    doctorInfo.specialtyId = inputData.specialtyId;
                    doctorInfo.clinicId = inputData.clinicId;
                    await doctorInfo.save();

                } else {
                    //create
                    await db.Doctor_Info.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        paymentId: inputData.selectedPayment,
                        provinceId: inputData.selectedProvince,
                        addressClinic: inputData.addressClinic,
                        nameClinic: inputData.nameClinic,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,
                    });
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Create Info Doctor Success!',
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getDetailDoctor = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        { model: db.AllCode, as: 'positionData', attributes: ['value_Vi', 'value_En'] },
                        { model: db.AllCode, as: 'genderData', attributes: ['value_Vi', 'value_En'] },
                        {
                            model: db.Doctor_Info,
                            attributes: {
                                exclude: ['doctorId', 'id']
                            },
                            include: [
                                { model: db.AllCode, as: 'priceTypeData', attributes: ['value_Vi', 'value_En'] },
                                { model: db.AllCode, as: 'provinceTypeData', attributes: ['value_Vi', 'value_En'] },
                                { model: db.AllCode, as: 'paymentTypeData', attributes: ['value_Vi', 'value_En'] },
                            ]
                        }

                    ],
                    raw: false,
                    nest: true
                });
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'Get Detail Doctor Success!',
                    data
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                // console.log("schedule: ", schedule);
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formattedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })

                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = Number(item.date)

                        return item;
                    })
                }
                // console.log("existing: ", existing);

                //compare
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })
                // console.log("ok:", toCreate);
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'no ok'
                    });
                }
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.AllCode, as: 'timeTypeData', attributes: ['value_Vi', 'value_En'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) data = [];

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getDetailExtraDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: { doctorId: doctorId },
                    attributes: {
                        exclude: ['doctorId', 'id']
                    },
                    include: [
                        { model: db.AllCode, as: 'priceTypeData', attributes: ['value_Vi', 'value_En'] },
                        { model: db.AllCode, as: 'provinceTypeData', attributes: ['value_Vi', 'value_En'] },
                        { model: db.AllCode, as: 'paymentTypeData', attributes: ['value_Vi', 'value_En'] },
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) data = {}

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getProfileDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!',
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        { model: db.AllCode, as: 'positionData', attributes: ['value_Vi', 'value_En'] },
                        {
                            model: db.Doctor_Info,
                            attributes: {
                                exclude: ['doctorId', 'id']
                            },
                            include: [
                                { model: db.AllCode, as: 'priceTypeData', attributes: ['value_Vi', 'value_En'] },
                                { model: db.AllCode, as: 'provinceTypeData', attributes: ['value_Vi', 'value_En'] },
                                { model: db.AllCode, as: 'paymentTypeData', attributes: ['value_Vi', 'value_En'] },
                            ]
                        }

                    ],
                    raw: false,
                    nest: true
                });
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'Get Detail Doctor Success!',
                    data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getDetailExtraDoctor: getDetailExtraDoctor,
    getProfileDoctor: getProfileDoctor
}