import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils';
import specialtyImg from '../../../assets/specialty/3.jpg'
import * as actions from '../../../store/actions'

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick'

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            arrDoctor: []
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrDoctor: this.props.topDoctor
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor();
    }

    handViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
        console.log("doctor ok: ", doctor);
    }
    render() {
        let arrDoctor = this.state.arrDoctor;
        let language = this.props.language;
        // arrDoctor = arrDoctor.concat(arrDoctor);

        return (

            <div className='section-share section-out-standing-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='home-header-banner.doctor-featured' /></span>
                        <button className='btn-section'><FormattedMessage id='home-header-banner.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctor && arrDoctor.length > 0
                                && arrDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    // console.log('img:', imageBase64);
                                    let nameVi = `${item.positionData.value_Vi}, ${item.firstName} ${item.lastName}`
                                    let nameEn = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}`
                                    return (

                                        <div className='section-customize' key={index} onClick={() => this.handViewDetailDoctor(item)}>
                                            <div className='border-customize'>
                                                <div className='out-bg'>
                                                    <div className='section-img out-standing-img'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === languages.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}


                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.admin.isLoggedIn
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => (dispatch)(changeLanguageApp(language)),
        loadTopDoctor: () => dispatch(actions.topDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
