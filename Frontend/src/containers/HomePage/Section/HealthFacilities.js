import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import specialtyImg from '../../../assets/specialty/2.jpg'

import Slider from 'react-slick'

class HealthFacilities extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='home-header-banner.medical-facilities' /></span>
                        <button className='btn-section'><FormattedMessage id='home-header-banner.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                {/* <div className='bg-image'></div> */}
                                <img className='section-img health-facility-img' src={specialtyImg}></img>
                                <div>Cơ sở 1</div>
                            </div>
                            <div className='section-customize'>
                                <img className='section-img health-facility-img' src={specialtyImg}></img>
                                <div>Cơ sở 2</div>
                            </div>
                            <div className='section-customize'>
                                <img className='section-img health-facility-img' src={specialtyImg}></img>
                                <div>Cơ sở 3</div>
                            </div>
                            <div className='section-customize'>
                                <img className='section-img health-facility-img' src={specialtyImg}></img>
                                <div>Cơ sở 4</div>
                            </div>
                            <div className='section-customize'>
                                <img className='section-img health-facility-img' src={specialtyImg}></img>
                                <div>Cơ sở 5</div>
                            </div>
                            <div className='section-customize'>
                                <img className='section-img health-facility-img' src={specialtyImg}></img>
                                <div>Cơ sở 6</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthFacilities);
