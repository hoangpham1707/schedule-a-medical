import actionTypes from './actionTypes';
import { toast } from 'react-toastify'
import { getAllCode } from '../../services/allCodeService';
import { getTopDoctor, getAllDoctors, saveInfoDoctor, detailDoctor } from '../../services/doctorService';
import { createUserService, getAllUser, deleteUserService, editUserService } from '../../services/userService'
//gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCode("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("Start err: ", error);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCode("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log("Start err: ", error);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCode("position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log("Start err: ", error);
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//Create User
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createUserService(data);
            // console.log('Check create:', res);
            if (res && res.errCode === 0) {
                toast.success("Tạo mới thành công!")
                dispatch(createNewUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createNewUserFailed());
            }
        } catch (error) {
            dispatch(createNewUserFailed());
            console.log("Start err: ", error);
        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//All User
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL');
            console.log('Check get all:', res);
            if (res && res.errCode === 0) {
                dispatch(fetchGetAllUserSuccess(res.users));
            } else {
                dispatch(fetchGetAllUserFailed());
            }
        } catch (error) {
            dispatch(fetchGetAllUserFailed());
            console.log("Start err: ", error);
        }
    }
}
export const fetchGetAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: users
})
export const fetchGetAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

//Delete User
export const deleteUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(data);
            // console.log('Check create:', res);
            if (res && res.errCode === 0) {
                toast.success("Xóa thành công!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log("Start err: ", error);
        }
    }
}
export const deleteUserSuccess = (users) => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

//Edit User
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            console.log('Check edit:', res);
            if (res && res.errCode === 0) {
                toast.success("Sửa thành công!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
            console.log("Start err: ", error);
        }
    }
}
export const editUserSuccess = (users) => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

//Top Doctor
export const topDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctor('');
            if (res && res.errCode === 0) {
                dispatch(topDoctorSuccess(res.data))
            }
            console.log('doctor1:', res);
        } catch (error) {
            dispatch(topDoctorFailed());
            console.log("Start err: ", error);
        }
    }
}
export const topDoctorSuccess = (doctors) => ({
    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
    doctor: doctors
})
export const topDoctorFailed = () => ({
    type: actionTypes.GET_TOP_DOCTOR_FAILED
})

//All Doctor
export const getAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorSuccess(res.data))
            }
            // console.log('doctor1:', res);
        } catch (error) {
            dispatch(getAllDoctorFailed());
            console.log("Start err: ", error);
        }
    }
}
export const getAllDoctorSuccess = (doctor) => ({
    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
    doctors: doctor
})
export const getAllDoctorFailed = () => ({
    type: actionTypes.GET_ALL_DOCTOR_FAILED
})

//Save Info Doctor
export const infoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInfoDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Thêm thành công!")
                dispatch(saveInfoDoctorSuccess())
            }
            // console.log('doctor1:', res);
        } catch (error) {
            toast.success("Thêm lỗi!")
            dispatch(saveInfoDoctorFailed());
            console.log("Start err: ", error);
        }
    }
}
export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
})
export const saveInfoDoctorFailed = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAILED
})

//Detail Doctor
export const fetchDetailDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await detailDoctor(id);
            console.log('Check get all:', res);
            if (res && res.errCode === 0) {
                dispatch(fetchDetailDoctorSuccess(res.data));
            } else {
                dispatch(fetchDetailDoctorFailed());
            }
        } catch (error) {
            dispatch(fetchGetAllUserFailed());
            console.log("Start err: ", error);
        }
    }
}
export const fetchDetailDoctorSuccess = (doctor) => ({
    type: actionTypes.DETAIL_DOCTOR_SUCCESS,
    doctor: doctor
})
export const fetchDetailDoctorFailed = () => ({
    type: actionTypes.DETAIL_DOCTOR_FAILED
})

//Schedule Doctor
export const scheduleHoursDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('TIME');
            // console.log('Get time all:', res);
            if (res && res.errCode === 0) {
                dispatch(scheduleHoursDoctorSuccess(res.data));
            } else {
                dispatch(fetchGetAllUserFailed());
            }
        } catch (error) {
            dispatch(scheduleHoursDoctorFailed());
            console.log("Start err: ", error);
        }
    }
}
export const scheduleHoursDoctorSuccess = (times) => ({
    type: actionTypes.ALL_CODE_SCHEDULE_HOURS_SUCCESS,
    times: times
})
export const scheduleHoursDoctorFailed = () => ({
    type: actionTypes.ALL_CODE_SCHEDULE_HOURS_FAILED
})

//Doctor Info
export const getRequiredDoctorPrice = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCode("PRICE");
            let resPayment = await getAllCode("PAYMENT");
            let resProvince = await getAllCode("PROVINCE");
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0) {

                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(getRequiredDoctorSuccess(data));
            } else {
                dispatch(getRequiredDoctorFailed());
            }
        } catch (error) {
            dispatch(getRequiredDoctorFailed());
            console.log("Start err: ", error);
        }
    }
}
export const getRequiredDoctorSuccess = (requireData) => ({
    type: actionTypes.REQUIRED_DOCTOR_INFO_SUCCESS,
    data: requireData
})
export const getRequiredDoctorFailed = () => ({
    type: actionTypes.REQUIRED_DOCTOR_INFO_FAILED
})
