import db from "../models"
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resole, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true

                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wong password!!!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email!`;

            }
            resole(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let compareUserPassword = () => {
    return new Promise((resole, reject) => {
        try {

        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resole(true);
            } else {
                resole(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = (id) => {
    return new Promise(async (resole, reject) => {
        try {
            let users = '';
            if (id === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (id && id !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resole(users);
        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {

        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already!'
                });
            }
            else {
                let email = data.email;
                let password = data.password;
                let firstName = data.firstName;
                let lastName = data.lastName;
                let address = data.address;
                let phoneNumber = data.phoneNumber;

                if (!email || !password || !firstName || !lastName || !address || !phoneNumber) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters!'
                    })
                }
                else {
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        roleId: data.roleId,
                        positionId: data.positionId,
                        image: data.image
                    })
                    resolve({
                        errCode: 0,
                        message: 'OK'
                    });
                }
            }


        } catch (error) {
            reject(error);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({ where: { id: data.id }, raw: false })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.image = data.image;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update Success!"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "No find user!"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'No find user'
                })
            }
            await user.destroy();
            resolve({
                errCode: 0,
                message: 'Delete success!'
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser,
}