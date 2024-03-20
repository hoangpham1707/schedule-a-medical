
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
// import Select from 'react-select'
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailClinic.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinic } from '../../../services/clinicService';
import { getAllCode } from '../../../services/allCodeService';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinic({
                id: id,
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;

                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;

        return (
            <div className='detail-clinic-container'>
                <HomeHeader ></HomeHeader>
                <div className='detail-clinic-body'>
                    <div className='des-clinic'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <>
                                <div className='name-clinic'>{dataDetailClinic.name}</div>
                                <div className='address-clinic'>{dataDetailClinic.address}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                            </>
                        }
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor'>
                                    <div className='detail-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDes={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            ></ProfileDoctor>
                                        </div>
                                    </div>
                                    <div className='detail-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorId={item} key={index}
                                            ></DoctorSchedule>
                                        </div>

                                        <div className='doctor-extra-info'>
                                            <DoctorExtraInfo doctorId={item}></DoctorExtraInfo>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
