import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        let user = this.props.userEdit;
        if (user) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                roleId: user.roleId
            })
        }
    }

    toggle = () => {
        this.props.toggleEditUserModal();
    }

    handleOnChangeInput = (event, i) => {
        let copyState = { ...this.state };
        copyState[i] = event.target.value;

        this.setState({
            ...copyState
        })
        // console.log(copyState);
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleEditUser = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            this.props.editUser(this.state);
            // console.log('data: ', this.state);
        }

    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user-container'} size='lg'>
                <ModalHeader toggle={() => { this.toggle() }}>Update a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'email') }} value={this.state.email} disabled></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => { this.handleOnChangeInput(event, 'password') }} value={this.state.password} disabled></input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }} value={this.state.firstName}></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }} value={this.state.lastName}></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'address') }} value={this.state.address}></input>
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }} value={this.state.phoneNumber}></input>
                        </div>
                        <div class="input-container sex-input">
                            <label>Sex</label>
                            <select name="gender" class="inputValue" onChange={(event) => { this.handleOnChangeInput(event, 'gender') }} value={this.state.gender}>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div class="input-container role-input">
                            <label>Role</label>
                            <select name="roleId" class="inputValue" onChange={(event) => { this.handleOnChangeInput(event, 'roleId') }} value={this.state.roleId}>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-3' onClick={() => { this.handleEditUser() }}>Update</Button>
                    <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}>Cannel</Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
