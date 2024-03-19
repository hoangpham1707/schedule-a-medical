import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
// import Select from 'react-select'
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import localization from 'moment/locale/vi'
import './DoctorSchedule.scss'
import { getScheduleDoctorByDate } from '../../../services/doctorService';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        // console.log('vi:', moment(new Date()).format('dddd-DD/MM'));
        // console.log('en:', moment(new Date()).locale('en').format('ddd-DD/MM'));
        let { language } = this.props;
        let allDays = this.getArrDay(language);

        this.setState({
            allDays: allDays,
        })
        // console.log("all day:", allDays);

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDay(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        if (prevProps.doctorId !== this.props.doctorId) {
            let allDays = this.getArrDay(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);

            this.setState({
                allAvailableTime: res.data ? res.data : []
            })

        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDay = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === languages.VI) {
                if (i == 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd-DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i == 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM');
                }

            }

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(obj);
        }
        return allDays;
        // console.log('arrDate:', allDay);
        // this.setState({
        //     allDay: allDay
        // })

    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }

            console.log('date check:', res);
        }
    }
    handleScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
        // console.log("time:", time);
    }
    toggleBookingModal = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking
        })
    }

    render() {
        let { language } = this.props
        let { allDays, allAvailableTime, dataScheduleTimeModal } = this.state;
        console.log("all:", allDays);
        return (
            <React.Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span><i className='fas fa-calendar-alt'><FormattedMessage id='manage-schedule.examination-schedule'></FormattedMessage></i></span>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btn'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeLanguage = language === languages.VI ? item.timeTypeData.value_Vi : item.timeTypeData.value_En;
                                            return (

                                                <button key={index} className={language === languages.VI ? 'btn-vi' : 'btn-en'}
                                                    onClick={() => this.handleScheduleTime(item)}
                                                >
                                                    {timeLanguage}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className='book-free'>
                                        <FormattedMessage id='patient.choose'></FormattedMessage><i className='far fa-hand-point-up'></i>
                                        <FormattedMessage id='patient.book-free'></FormattedMessage>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'><FormattedMessage id='manage-schedule.no-scheduled'></FormattedMessage></div>
                            }



                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpen={this.state.isOpenModalBooking}
                    toggleBookingModal={this.toggleBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctor: state.admin.doctorSchedule,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
