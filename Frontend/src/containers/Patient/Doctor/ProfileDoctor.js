import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
// import Select from 'react-select'
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi'
import './ProfileDoctor.scss'
import { profileDoctor } from '../../../services/doctorService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            // this.getInfoDoctor(this.props.doctorId);
        }
    }

    getInfoDoctor = async (doctorId) => {
        let result = {};
        let res = await profileDoctor(doctorId);
        if (res && res.errCode === 0) {
            result = res.data;
        }
        return result;
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        let date = {};
        // console.log("dataTime:", dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ? dataTime.timeTypeData.value_Vi : dataTime.timeTypeData.value_En
            date = language === languages.VI ?

                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.free-appointment'></FormattedMessage></div>
                </>
            )
        }
        return (
            <>

            </>
        )
    }

    render() {
        console.log("data profile:", this.state);
        let { dataProfile } = this.state;
        let { language, isShowDes, dataTime } = this.props;
        console.log("dataTime:", dataTime);
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.value_Vi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.value_En}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>


                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}>
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === languages.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDes === true ?
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                        </div>
                        <div className=''>
                            {dataProfile && dataProfile.Doctor_Info
                                && <span>{dataProfile.Doctor_Info.addressClinic}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='price'>
                    <FormattedMessage id='patient.examination-price' />
                    {dataProfile && dataProfile.Doctor_Info && language === languages.VI &&
                        <NumberFormat className='currency'
                            value={dataProfile.Doctor_Info.priceTypeData.value_Vi} displayType={'text'}
                            thousandSeparator={true} suffix={'VND'}
                        />
                    }

                    {dataProfile && dataProfile.Doctor_Info && language === languages.EN &&
                        <NumberFormat className='currency'
                            value={dataProfile.Doctor_Info.priceTypeData.value_En} displayType={'text'}
                            thousandSeparator={true} suffix={'$'}
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
