import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../../store/actions'
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về HBT
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height='400px'
                            src='https://www.youtube.com/watch?v=6kg8caF4Kek&t=465s'
                            title='Youtube video player'
                            frameBorder="0" allow='accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope;picture-in-picture'
                            allowFullScreen ></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Chào mừng đến với website của chúng tôi!!!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
