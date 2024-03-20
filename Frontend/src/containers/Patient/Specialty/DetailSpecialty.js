
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
// import Select from 'react-select'
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialty } from '../../../services/specialtyService';
import { getAllCode } from '../../../services/allCodeService';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialty({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCode('PROVINCE');
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;

                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvince.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeSelect = (event) => {
        console.log('on change:', event.target.value);
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader ></HomeHeader>
                <div className='detail-specialty-body'>
                    <div className='des-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                        }
                    </div>
                    <div className='search-specialty-doctor'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0
                                && listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === languages.VI ? item.value_Vi : item.value_En}
                                        </option>
                                    )
                                })}
                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
