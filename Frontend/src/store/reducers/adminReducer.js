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

            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoadingGender = false;

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

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoadingGender = false;

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

            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            console.log('users: ', action);
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:

            state.topDoctor = action.doctor;
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            console.log('users: ', action);
            state.topDoctor = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:

            state.allDoctor = action.doctors;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_FAILED:
            console.log('users: ', action);
            state.allDoctor = [];
            return {
                ...state,
            }
        case actionTypes.DETAIL_DOCTOR_SUCCESS:

            state.detailDoctor = action.doctor;
            return {
                ...state,
            }
        case actionTypes.DETAIL_DOCTOR_FAILED:

            state.detailDoctor = '';
            return {
                ...state,
            }
        case actionTypes.ALL_CODE_SCHEDULE_HOURS_SUCCESS:
            state.scheduleTime = action.times;

            return {
                ...state,
            }
        case actionTypes.ALL_CODE_SCHEDULE_HOURS_FAILED:

            state.scheduleTime = [];
            return {
                ...state,
            }
        case actionTypes.REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;

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