import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { USER_ROLE, languages } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //alert('ok')
    }
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        console.log("UserInfo: ", this.props.userInfo);
        const { processLogout, userInfo } = this.props;
        let language = this.props.language;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* ngôn ngữ */}
                <div className='languages'>
                    <span className='welcome'><FormattedMessage id='home-header-content.welcome' />,
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                    </span>
                    <span className={language === languages.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.handleChangeLanguage(languages.VI)}>VN</span>
                    <span className={language === languages.EN ? 'language-en active' : 'language-en'} onClick={() => this.handleChangeLanguage(languages.EN)}>EN</span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log Out">
                        <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => (dispatch)(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
