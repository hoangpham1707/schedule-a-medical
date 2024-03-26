import jwt from 'jsonwebtoken'
require('dotenv').config();

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log('err:', error);
    }

    // console.log('token: ', token);
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error);
    }
    // console.log('data:', data);
    return data;
}

const checkUserJWT = (req, res, next) => {
    let cookie = req.cookies;

    if (cookie && cookie.jwt) {
        let token = cookie.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.userJWT = decoded;
            console.log(decoded);
            next();
        } else {
            return res.status(401).json({
                errCode: 1,
                message: 'Not authenticated the user!'
            })
        }
    } else {
        return res.status(401).json({
            errCode: 1,
            message: 'Not authenticated the user!'
        })
    }
}

const adminJWT = (req, res, next) => {
    if (req.userJWT) {
        let roleId = req.userJWT.roleId;
        if (roleId === 'R1') {
            next();
        }
    } else {
        return res.status(403).json({
            errCode: 1,
            message: `You don't permission to access this resource...`
        })
    }
}
const doctorJWT = (req, res, next) => {
    if (req.userJWT) {
        let roleId = req.userJWT.roleId;
        if (roleId === 'R2') {
            next();
        }
    } else {
        return res.status(403).json({
            errCode: 1,
            message: `You don't permission to access this resource...`
        })
    }
}
module.exports = {
    createJWT, verifyToken, checkUserJWT, adminJWT, doctorJWT
}