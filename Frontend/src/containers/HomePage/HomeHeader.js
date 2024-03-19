import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.png'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        // alert(language)
    }
    returnHome = () => {
        this.props.history.push(`/home`);
    }
    render() {
        // console.log('check: ', this.props);
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'>
                                <img src={logo}
                                    onClick={() => this.returnHome()}
                                ></img>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header-content.specialty' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header-content.search-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header-content.health-facilities' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header-content.choose-hospital-clinic' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header-content.doctor' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header-content.choose-good-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header-content.medical-package' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header-content.general-check' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i><FormattedMessage id='home-header-content.support' /></div>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(languages.VI)}>VN</span></div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.iShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id='home-header-banner.medical-foundation' /></div>
                            <div className='title2'><FormattedMessage id='home-header-banner.health-care' /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                {/* <FormattedMessage id='home-header-banner.find-medical-specialist' /> */}
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id='home-header-banner.specialized-examination' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                    <div className='text-child'><FormattedMessage id='home-header-banner.remote-examination' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                    <div className='text-child'><FormattedMessage id='home-header-banner.general examination' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'><FormattedMessage id='home-header-banner.medical-tests' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md" /></div>
                                    <div className='text-child'><FormattedMessage id='home-header-banner.mental-health' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id='home-header-banner.dental-examination' /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
