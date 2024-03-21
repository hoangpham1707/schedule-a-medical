import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ROLE, languages } from "../utils";
class Home extends Component {
    render() {
        const { isLoggedIn } = this.props;
        // let { userInfo } = this.props;
        // console.log('user: ', userInfo);
        // let linkToRedirect = userInfo.roleId === USER_ROLE.ADMIN ? '/system/user-redux' : '/doctor/patient-manage';
        let linkToRedirect = isLoggedIn ? '/system/user-redux' : '/home';

        return (
            <>
                <Redirect to={linkToRedirect} />
                {/* <Redirect to={linkToRedirect1} /> */}
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.admin.isLoggedIn
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
