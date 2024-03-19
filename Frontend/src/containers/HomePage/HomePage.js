import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty'
import HealthFacilities from './Section/HealthFacilities';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About'
import HomeFooter from './HomeFooter'
import './HomePage.scss'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinity: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        }
        return (
            <div>
                <HomeHeader iShowBanner={true}></HomeHeader>
                <Specialty settings={settings}></Specialty>
                <HealthFacilities settings={settings}></HealthFacilities>
                <OutStandingDoctor settings={settings}></OutStandingDoctor>
                <HandBook settings={settings}></HandBook>
                <About></About>
                <HomeFooter></HomeFooter>
                <div style={{ height: '300px' }}></div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
