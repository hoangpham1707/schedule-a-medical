import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
// import Select from 'react-select'
// import * as actions from "../../../store/actions";
// import { languages } from '../../../utils';
// import { FormattedMessage } from 'react-intl';
import { VerifyBookDoctor } from '../../services/patientService'
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyBooking.scss';

class VerifyBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await VerifyBookDoctor({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
            console.log('token: ', token, doctorId);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        console.log("state:", this.state);
        let { errCode, statusVerify } = this.state;
        return (
            <>
                <HomeHeader></HomeHeader>
                <div className='verify-booking'>
                    {statusVerify === false ?
                        <div>Loading data ...</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='info-booking'>Xác nhận lịch hẹn thành công</div>
                                :
                                <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
