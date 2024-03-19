import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import { dateFormat, languages } from '../../../utils';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker'
import { toast } from 'react-toastify'
import _, { result } from 'lodash';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate'
import { saveBulkSchedule } from '../../../services/doctorService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctor: [],
            selectedDoctor: '',
            currentDate: '',
            rangeTime: ''
        }
    }

    componentDidMount() {
        this.props.allDoctorRedux();
        this.props.allScheduleTimeRedux();
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label = language === languages.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let doctorSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: doctorSelect
            })
        }
        if (prevProps.language != this.props.language) {
            let doctorSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: doctorSelect
            })
        }
        if (prevProps.allScheduleTime != this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({
                    ...item,
                    isSelected: false
                }))
            }
            // console.log("data:", data);
            this.setState({
                rangeTime: data
            })
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        console.log("time:", time);
        let { rangeTime } = this.state;
        // console.log("before:", rangeTime);
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
            // console.log("rangeTime:", rangeTime);
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error('Invalid date!');
            return;
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid Doctor!');
            return;
        }
        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formattedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formattedDate;
                    obj.timeType = schedule.keyMap;
                    result.push(obj);
                })
            } else {
                toast.error('Invalid Selected Time!');
                return;
            }

        }
        let res = await saveBulkSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        });

        if (res && res.errCode === 0) {
            toast.success('Save Success!!!');
        } else {
            toast.error('Save Error!!!');
        }
        console.log('res:', res);
    }
    render() {
        const { isLoggedIn } = this.props;
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        // console.log("rangeTime:", rangeTime);
        return (
            <div className='manage-schedule-container'>
                <div className='manage-schedule-title'>
                    <FormattedMessage id='manage-schedule.title'></FormattedMessage>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label> <FormattedMessage id='manage-schedule.choose-doctor'></FormattedMessage></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                                placeholder={<FormattedMessage id='manage-schedule.choose-doctor'></FormattedMessage>}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date'></FormattedMessage></label>
                            <DatePicker onChange={this.handleOnChangeDatePicker} className='form-control'
                                value={this.state.currentDate[0]}
                                minDate={yesterday}
                            ></DatePicker>
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} value={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === languages.VI ? item.value_Vi : item.value_En}
                                        </button>
                                    )
                                })
                            }
                            {/* <FormattedDate value={this.state.currentDate}></FormattedDate> */}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            > <FormattedMessage id='manage-schedule.save-info'></FormattedMessage></button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allScheduleTime: state.admin.scheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        allDoctorRedux: () => dispatch(actions.getAllDoctor()),
        allScheduleTimeRedux: () => dispatch(actions.scheduleHoursDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
