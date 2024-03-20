import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorManage.scss'
import { CRUD_ACTIONS, languages } from '../../../utils';
import * as actions from "../../../store/actions";
import { detailDoctor } from '../../../services/doctorService'

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import _ from 'lodash';
import Select from 'react-select';
const mdParser = new MarkdownIt(/* Markdown-it options */);



class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            listDoctor: [],
            isData: false,

            //info doctor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: ''
        }
    }

    async componentDidMount() {
        this.props.allDoctorRedux();
        this.props.getRequiredDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let doctorSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            this.setState({
                listDoctor: doctorSelect
            })
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo;
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectedClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            // console.log("state: ", dataSelectedPrice, dataSelectedPayment, dataSelectedProvince);
            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
                listSpecialty: dataSelectedSpecialty,
                listClinic: dataSelectedClinic
            })
        }

        if (prevProps.language != this.props.language) {
            let doctorSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctor: doctorSelect,
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
        // console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkDown = async () => {
        let { isData } = this.state;
        await this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: isData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : ''

        });


        this.setState({
            selectedDoctor: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',

        })


        // console.log('check:', this.state);
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await detailDoctor(selectedDoctor.value)
        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let nameClinic = '', addressClinic = '', note = '';
            let priceId = '', paymentId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = '', selectedSpecialty = '', selectedClinic = '';

            if (res.data.Doctor_Info) {
                nameClinic = res.data.Doctor_Info.nameClinic;
                addressClinic = res.data.Doctor_Info.addressClinic;
                note = res.data.Doctor_Info.note;
                priceId = res.data.Doctor_Info.priceId;
                paymentId = res.data.Doctor_Info.paymentId;
                provinceId = res.data.Doctor_Info.provinceId;
                specialtyId = res.data.Doctor_Info.specialtyId;
                clinicId = res.data.Doctor_Info.clinicId

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                isData: true,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                isData: false,
                nameClinic: '',
                addressClinic: '',
                note: ''
            })
        }
        console.log("Id doctor:", res);
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    obj.label = language === languages.VI ? labelVi : labelEn;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.value_Vi} VND`;
                    let labelEn = `${item.value_En} USD`;
                    obj.label = language === languages.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = item.value_Vi;
                    let labelEn = item.value_En;
                    obj.label = language === languages.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
                console.log('price:', inputData);
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name
                    obj.value = item.id;
                    result.push(obj);
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name
                    obj.value = item.id;
                    result.push(obj);
                })
            }

        }
        return result;
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { isData } = this.state;
        console.log("state:", this.state);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='menu.doctor.create-doctor-info'></FormattedMessage>
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='manage-schedule.choose-doctor'></FormattedMessage></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id='manage-schedule.choose-doctor'></FormattedMessage>}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='menu.doctor.introduce'></FormattedMessage></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeInput(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.doctor.price'></FormattedMessage></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='menu.doctor.price'></FormattedMessage>}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.doctor.payment'></FormattedMessage></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='menu.doctor.payment'></FormattedMessage>}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.doctor.province'></FormattedMessage></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='menu.doctor.province'></FormattedMessage>}
                            name='selectedProvince'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.doctor.clinic-name'></FormattedMessage></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeInput(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.doctor.clinic-address'></FormattedMessage></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeInput(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.doctor.note'></FormattedMessage></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeInput(event, 'note')}
                            value={this.state.note}
                        ></input>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.admin.specialty'></FormattedMessage></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id='menu.admin.specialty'></FormattedMessage>}
                            name='selectedSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='menu.admin.clinic'></FormattedMessage></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id='menu.admin.clinic'></FormattedMessage>}
                            name='selectedSpecialty'
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button onClick={() => this.handleSaveContentMarkDown()}
                    className={isData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {isData === true ? <span><FormattedMessage id='button.save-info'></FormattedMessage></span> : <span><FormattedMessage id='button.create-info'></FormattedMessage></span>}</button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        allDoctorRedux: () => dispatch(actions.getAllDoctor()),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        saveInfoDoctor: (data) => dispatch(actions.infoDoctor(data)),
        getRequiredDoctor: () => dispatch(actions.getRequiredDoctor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
