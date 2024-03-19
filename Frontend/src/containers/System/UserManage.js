import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManager.scss'
import { getAllUser, createUserService, deleteUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser'
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class UserManage extends Component {
    /*
    Life cycle
    Run component:
    1. Run constructor->init state
    2. Did mount (set state)
    3. Render
    */

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserReact();
    }
    getAllUserReact = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.user
            }, () => {
                //  console.log('check state user ', this.state.arrUser);
            })
            // console.log('check state user 1 ', this.state.arrUser);
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createUser = async (data) => {
        try {
            let response = await createUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            console.log("response: ", response);
        } catch (error) {
            console.log(error);
        }
    }

    editUser = async (data) => {
        //console.log(data);
        try {
            let response = await editUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserReact();
                this.setState({
                    isOpenModalEditUser: false
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteUser = async (id) => {
        try {
            let response = await deleteUserService(id);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserReact();
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUser = this.state.arrUser;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createUser={this.createUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleEditUserModal={this.toggleEditUserModal}
                        userEdit={this.state.userEdit}
                        editUser={this.editUser}
                    />}
                <div className='title text-center'>Manager users</div>
                <div className='mx-1 px-3'>
                    <button className='btb btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i>Add new users
                    </button>

                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>


                        {arrUser && arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>

                                    <td>
                                        <button><i class="fas fa-user-edit" onClick={() => this.handleEditUser(item)}></i></button>
                                        <button className='btn-delete' onClick={() => { this.deleteUser(item.id) }}><i class="fas fa-trash"></i></button>

                                    </td>
                                </tr>
                            )
                        })

                        }
                    </table>
                </div>

            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
