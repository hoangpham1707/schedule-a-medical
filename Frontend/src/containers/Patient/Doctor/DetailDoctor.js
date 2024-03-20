import React, { Component } from 'react';
import { connect } from "react-redux";

import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import './DetailDoctor.scss'

import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                currentDoctorId: this.props.match.params.id
            })
            this.props.detailDoctorRedux(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        // console.log(this.props.match.params.id);
        // console.log("state:", this.state);
        let detailDoctor = this.props.doctor;
        let language = this.props.language;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.value_Vi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.value_En}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        console.log("detail doctor:", this.props.doctor);

        return (
            <React.Fragment>
                <HomeHeader iShowBanner={false}></HomeHeader>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === languages.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>{detailDoctor.Markdown.description}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorId={this.state.currentDoctorId}
                            ></DoctorSchedule>
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfo doctorId={this.state.currentDoctorId}></DoctorExtraInfo>
                        </div>
                    </div>
                    <div className='detail-info-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctor: state.admin.detailDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        detailDoctorRedux: (id) => dispatch(actions.fetchDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
