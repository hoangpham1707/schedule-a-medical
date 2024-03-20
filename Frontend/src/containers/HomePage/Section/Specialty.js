import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeLanguageApp } from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'
import { getAllSpecialty } from '../../../services/specialtyService'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
        // console.log('res:', res);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    }
    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='home-header-banner.popular-specialties' /></span>
                        <button className='btn-section'><FormattedMessage id='home-header-banner.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handViewDetailSpecialty(item)}>
                                            {/* <div className='bg-image'></div> */}
                                            <div className='out-bg'>
                                                <div className='section-img out-specialty-img'
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => (dispatch)(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
