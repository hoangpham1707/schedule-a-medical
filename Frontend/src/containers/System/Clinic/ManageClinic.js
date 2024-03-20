import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
// import Select from 'react-select'
import * as actions from "../../../store/actions";
import { languages, CommonUtils } from '../../../utils';
// import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'

import { createClinic } from '../../../services/clinicService'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
        // console.log('handleEditorChange', html, text);
    }

    handleImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('base:', base64);
            // let objUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleOnChangeInput = (event, input) => {
        let copyState = { ...this.state };
        copyState[input] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleSaveNewClinic = async () => {
        let res = await createClinic(this.state);
        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
            toast.success("Create Clinic Success!!!")
        } else {
            toast.error("Create Error!!!")
        }
    }
    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'><FormattedMessage id='menu.admin.clinic-manage' /> </div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='menu.doctor.clinic-name' /></label>
                        <input className='form-control' type='text'
                            value={this.state.name} onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='menu.admin.image-clinic' /></label>
                        <input className='form-control' type='file'
                            onChange={(event) => this.handleImage(event)}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='menu.doctor.clinic-address' /></label>
                        <input className='form-control' type='text'
                            value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        ></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '380px', margin: '20px 0' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}><FormattedMessage id='button.save-info' /></button>
                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
