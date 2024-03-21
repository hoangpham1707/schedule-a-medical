import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
// import Select from 'react-select'
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify'
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { getPatientToDoctorByDate, sendRemedyService } from '../../../services/doctorService';
import RemedyModal from './RemedyModal';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: '',
        }
    }

    async componentDidMount() {

        this.getDataPatient()

    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        let res = await getPatientToDoctorByDate({
            doctorId: user.id,
            date: formattedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName

        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        console.log('data:', data);
    }

    closeModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: ''
        })
    }
    sendRemedy = async (dataFormModal) => {
        let { dataModal } = this.state;
        let res = await sendRemedyService({
            email: dataFormModal.email,
            imgBase64: dataFormModal.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            toast.success('Send Success!!!')
            this.closeModal();
            await this.getDataPatient();
        } else {
            toast.error('Send Error!!!')
        }
        console.log("res:", res);
    }
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        console.log('state:', this.state);
        return (
            <>
                <div className='doctor-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='doctor-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chon ngay kham</label>
                            <DatePicker onChange={this.handleOnChangeDatePicker} className='form-control'
                                value={this.state.currentDate}
                            ></DatePicker>
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Tên</th>
                                        <th>Giớ tính</th>
                                        <th>Hành động</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0
                                        ? dataPatient.map((item, index) => {
                                            let time = language === languages.VI ? item.timeTypeDataPatient.value_Vi : item.timeTypeDataPatient.value_En;
                                            let gender = language === languages.VI ? item.patientData.genderData.value_Vi : item.patientData.genderData.value_En;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm' onClick={() => this.handleConfirm(item)}>Xác nhận</button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center' }}>Không có lịch hẹn</td>

                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpen={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeModal={this.closeModal}
                    sendRemedy={this.sendRemedy}
                ></RemedyModal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
