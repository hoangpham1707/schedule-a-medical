import React, { Component } from 'react';
import { connect } from "react-redux";

import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import './DoctorExtraInfo.scss'
import { detailExtraDoctor } from '../../../services/doctorService';
import NumberFormat from 'react-number-format';


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfoDoctor: ''
        }
    }

    async componentDidMount() {
        if (this.props.doctorId) {
            let res = await detailExtraDoctor(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfoDoctor: res.data
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await detailExtraDoctor(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfoDoctor: res.data
                })
            }
            // console.log('extra: ', res);
        }
    }
    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo, extraInfoDoctor } = this.state;
        let { language } = this.props;
        return (

            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id='patient.doctor.clinic-address'></FormattedMessage></div>
                    <div className='name-clinic'>{extraInfoDoctor && extraInfoDoctor.nameClinic ? extraInfoDoctor.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfoDoctor && extraInfoDoctor.addressClinic ? extraInfoDoctor.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfo === false ?
                        <div className='short-info'><FormattedMessage id='patient.doctor.examination-price'></FormattedMessage>
                            {extraInfoDoctor && extraInfoDoctor.priceTypeData && language === languages.VI
                                &&
                                <NumberFormat className='currency'
                                    value={extraInfoDoctor.priceTypeData.value_Vi} displayType={'text'}
                                    thousandSeparator={true} suffix={'VND'}
                                />
                            }
                            {extraInfoDoctor && extraInfoDoctor.priceTypeData && language === languages.EN
                                &&
                                <NumberFormat className='currency'
                                    value={extraInfoDoctor.priceTypeData.value_En} displayType={'text'}
                                    thousandSeparator={true} suffix={'$'}
                                />
                            }

                            <span className='detail' onClick={() => this.showHideDetailInfo(true)}><FormattedMessage id='patient.doctor.see-details'></FormattedMessage></span>
                        </div>

                        : <>
                            <div className='title-price'><FormattedMessage id='patient.doctor.examination-price'></FormattedMessage></div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id='patient.doctor.examination-price'></FormattedMessage></span>
                                    <span className='right'>
                                        {extraInfoDoctor && extraInfoDoctor.priceTypeData && language === languages.VI
                                            &&
                                            <NumberFormat className='currency'
                                                value={extraInfoDoctor.priceTypeData.value_Vi} displayType={'text'}
                                                thousandSeparator={true} suffix={'VND'}
                                            />
                                        }
                                        {extraInfoDoctor && extraInfoDoctor.priceTypeData && language === languages.EN
                                            &&
                                            <NumberFormat className='currency'
                                                value={extraInfoDoctor.priceTypeData.value_En} displayType={'text'}
                                                thousandSeparator={true} suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>{extraInfoDoctor && extraInfoDoctor.note ? extraInfoDoctor.note : ''}</div>
                            </div>
                            <div className='payment'>
                                <span>{extraInfoDoctor && extraInfoDoctor.paymentTypeData && language === languages.VI ? extraInfoDoctor.paymentTypeData.value_Vi : ''}
                                    {extraInfoDoctor && extraInfoDoctor.paymentTypeData && language === languages.EN ? extraInfoDoctor.paymentTypeData.value_En : ''}
                                </span>
                            </div>
                            <div className='hide-price'>
                                <span className='detail' onClick={() => this.showHideDetailInfo(false)}><FormattedMessage id='patient.doctor.hide-less'></FormattedMessage></span></div>
                        </>

                    }

                </div>
            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
