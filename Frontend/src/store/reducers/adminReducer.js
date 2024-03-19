import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    infoDoctor: [],
    detailDoctor: '',
    scheduleTime: [],
    allRequiredDoctorInfo: []
    // isLoggedIn: false,
    // adminInfo: null
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            // console.log('start: ', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            console.log('success: ', state);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('failed: ', action);
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_START:
            state.isLoadingGender = true;
            // console.log('start: ', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoadingGender = false;
            console.log('success: ', state);
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            console.log('failed: ', action);
            state.isLoadingGender = false;
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_START:
            state.isLoadingGender = true;
            // console.log('start: ', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoadingGender = false;
            console.log('success: ', state);
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            console.log('failed: ', action);
            state.isLoadingGender = false;
            state.positions = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            // console.log('users: ', action);
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            // console.log('users: ', action);
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            console.log('doctor: ', action);
            state.topDoctor = action.doctor;
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            // console.log('users: ', action);
            state.topDoctor = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            // console.log('All Doctor: ', action);
            state.allDoctor = action.doctors;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_FAILED:
            // console.log('users: ', action);
            state.allDoctor = [];
            return {
                ...state,
            }
        case actionTypes.DETAIL_DOCTOR_SUCCESS:
            // console.log('All Doctor: ', action);
            state.detailDoctor = action.doctor;
            return {
                ...state,
            }
        case actionTypes.DETAIL_DOCTOR_FAILED:
            // console.log('users: ', action);
            state.detailDoctor = '';
            return {
                ...state,
            }
        case actionTypes.ALL_CODE_SCHEDULE_HOURS_SUCCESS:
            state.scheduleTime = action.times;
            // console.log('All Doctor: ', state.scheduleTime);
            return {
                ...state,
            }
        case actionTypes.ALL_CODE_SCHEDULE_HOURS_FAILED:
            // console.log('users: ', action);
            state.scheduleTime = [];
            return {
                ...state,
            }
        case actionTypes.REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            console.log("data: ", action.data);
            return {
                ...state,
            }
        case actionTypes.REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;