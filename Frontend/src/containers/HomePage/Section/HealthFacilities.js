import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import specialtyImg from '../../../assets/specialty/2.jpg'
import { getAllClinic } from '../../../services/clinicService'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

import Slider from 'react-slick'

class HealthFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    }
    render() {
        let { dataClinics } = this.state;
        console.log('clinic:', dataClinics);
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='home-header-banner.medical-facilities' /></span>
                        <button className='btn-section'><FormattedMessage id='home-header-banner.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handViewDetailClinic(item)}>
                                            <div className='out-bg'>
                                                <div className='section-img out-clinic-img'
                                                    style={{ backgroundImage: `url(${item.image})` }}></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{item.name}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => (dispatch)(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HealthFacilities));
