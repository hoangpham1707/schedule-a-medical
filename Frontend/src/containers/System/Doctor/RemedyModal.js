import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';

import _ from 'lodash';
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify'




import './RemedyModal.scss'

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''

        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
        // console.log("state", this.state);
    }
    render() {
        let { isOpen, closeModal, dataModal, sendRemedy } = this.props;

        // console.log('booking', this.state);
        return (
            <Modal isOpen={isOpen} className={'booking-modal-container'} size='lg' centered >
                <div className='modal-header'>
                    <h5 className='modal-title'>
                        Gui hoa don kham benh
                    </h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                {/* <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader> */}
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email benh nhan</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnChange(event)}
                            ></input>
                        </div>
                        <div className='col-6 form-group'>

                            <label>Chon file don thuoc</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleImage(event)}
                            ></input>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-3' onClick={this.handleSendRemedy}>Send</Button>
                    <Button color='secondary' className='px-3' onClick={closeModal}>Cannel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
