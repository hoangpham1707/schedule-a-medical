import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeLanguageApp } from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import specialtyImg from '../../../assets/specialty/1.jpg'
import Slider from 'react-slick'

class Specialty extends Component {
    render() {


        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='home-header-banner.popular-specialties' /></span>
                        <button className='btn-section'><FormattedMessage id='home-header-banner.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                {/* <div className='bg-image'></div> */}
                                <img src={specialtyImg}></img>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='section-customize'>
                                <img src={specialtyImg}></img>
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className='section-customize'>
                                <img src={specialtyImg}></img>
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className='section-customize'>
                                <img src={specialtyImg}></img>
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className='section-customize'>
                                <img src={specialtyImg}></img>
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className='section-customize'>
                                <img src={specialtyImg}></img>
                                <div>Cơ xương khớp 6</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => (dispatch)(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);