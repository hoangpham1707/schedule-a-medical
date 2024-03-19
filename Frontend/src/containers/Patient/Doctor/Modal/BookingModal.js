import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import DatePicker from '../../../../components/Input/DatePicker'
import _ from 'lodash';
import Select from 'react-select'
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import { PatientBookDoctor } from '../../../../services/patientService'


import './BookingModal.scss'

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            selectedGender: '',
            doctorId: '',
            timeType: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataTime.timeType
                })
            }
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = language === languages.VI ? item.value_Vi : item.value_En
                obj.value = item.keyMap;
                result.push(obj);
            })
        }
        return result;
    }
    toggle = () => {
        this.props.toggleBookingModal();
    }
    handleOnChangeInput = (event, input) => {
        let value = event.target.value;
        let copyState = { ...this.state };
        copyState[input] = value;
        this.setState({
            ...copyState
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })

    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
        console.log("selected:", selectedOption);
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        let date = {};
        // console.log("dataTime:", dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ? dataTime.timeTypeData.value_Vi : dataTime.timeTypeData.value_En
            date = language === languages.VI ?

                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return <></>
    }

    buildDoctorBooking = (dataTime) => {
        let { language } = this.props;

        // console.log("dataTime:", dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === languages.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return <></>
    }
    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorBooking(this.props.dataTime);
        let res = await PatientBookDoctor({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            gender: this.state.gender,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        console.log("res:", res);

        if (res && res.errCode === 0) {
            toast.success('Booking success!!!');
            this.props.toggleBookingModal(false);
        } else {
            toast.error('Booking error!!!');
        }
        // console.log("a:", this.state);
    }
    render() {
        let { dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        // console.log('booking', this.state);
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'booking-modal-container'} size='lg' centered >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.doctor.modal.medical-examination-schedule'></FormattedMessage></span>
                        <span className='right' onClick={() => this.toggle()}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDes={false}
                                dataTime={dataTime}
                            ></ProfileDoctor>
                        </div>
                        {/* <div className='price'>500k</div> */}
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.doctor.modal.full-name'></FormattedMessage></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.doctor.modal.phone-number'></FormattedMessage></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.doctor.modal.email'></FormattedMessage></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.doctor.modal.address'></FormattedMessage></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                ></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.doctor.modal.reason'></FormattedMessage></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.doctor.modal.birthday'></FormattedMessage></label>
                                <DatePicker onChange={this.handleOnChangeDatePicker} className='form-control'
                                    value={this.state.birthday}
                                ></DatePicker>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.doctor.modal.gender'></FormattedMessage></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.gender}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        ><FormattedMessage id='patient.doctor.modal.confirm'></FormattedMessage></button>
                        <button className='btn-booking-cannel' onClick={() => this.toggle()}>
                            <FormattedMessage id='patient.doctor.modal.cannel'></FormattedMessage></button>
                    </div>
                </div>

            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
