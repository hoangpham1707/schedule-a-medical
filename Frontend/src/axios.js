import axios from 'axios';
import _ from 'lodash';
import config from './config';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});
instance.defaults.withCredentials = true
// const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
//     const error = new Error();
//     error.httpStatusCode = httpStatusCode;
//     error.statusCode = statusCode;
//     error.errorMessage = errorMessage;
//     error.problems = problems;
//     error.errorCode = errorCode + "";
//     return error;
// };

// export const isSuccessStatusCode = (s) => {
//     // May be string or number
//     const statusType = typeof s;
//     return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
// };

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        // if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('errmsg')) {
        //     return Promise.reject(createError(response.status, data['s'], data['errmsg'], null, data['errcode'] ? data['errcode'] : ""));
        // }

        // // Return direct data to callback
        // if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
        //     return data['d'];
        // }
        // // Handle special case
        // if (data.hasOwnProperty('s') && _.keys(data).length === 1) {
        //     return null;
        // }
        return response.data;
    }, (error) => {
        const status = error && error.response && error.response.status || 500;
        console.log('status: ', status);
        switch (status) {
            case 401: {
                toast.error('Unauthorized the user. Please login...')
                return Promise.reject(error);
            }
            case 403: {
                toast.error(`You don't permission to access this resource...`)
                return Promise.reject(error);
            }
            case 400: {
                return Promise.reject(error);
            }
            case 404: {
                return Promise.reject(error);
            }
            case 409: {
                return Promise.reject(error);
            }
            case 422: {
                return Promise.reject(error);
            }
            default: {
                toast.error(`You don't permission to access this resource...`)
                return Promise.reject(error);
            }
        }
    }
    // (error) => {
    //     const { response } = error;
    //     if (response == null) {
    //         return Promise.reject(error);
    //     }

    //     const { data } = response;

    //     if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
    //         return Promise.reject(createError(response.status, data['s'], data['errmsg']));
    //     }

    //     if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
    //         return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
    //     }

    //     return Promise.reject(createError(response.status));
    // }
);

export default instance;
