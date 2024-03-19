import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
// import {CommonUtils} from '../../../utils/CommonUtils'
import './UserRedux.scss';
import TableManageUser from './TableManageUser';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            positionId: '',
            image: '',
            previewImg: '',
            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();
        // try {
        //     let res = await getAllCode('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }

        if (prevProps.listUser !== this.props.listUser) {
            let arrGender = this.props.genderRedux
            let arrRole = this.props.roleRedux
            let arrPosition = this.props.positionRedux

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                positionId: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                image: '',
                previewImg: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('base:', base64);
            let objUrl = URL.createObjectURL(file);
            this.setState({
                previewImg: objUrl,
                image: base64
            })
        }
    }

    openPreviewImg = () => {
        if (!this.state.previewImg) return;
        this.setState({
            isOpen: true
        })
    }

    changeInput = (event, input) => {
        let copyState = { ...this.state };
        copyState[input] = event.target.value;
        this.setState({
            ...copyState
        })
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

    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        // console.log("save:", this.state);

        if (isValid === false) return;

        let { action } = this.state;
        console.log('action:', action);
        if (action === CRUD_ACTIONS.CREATE) {
            // let arrGender = this.props.genderRedux
            // let arrRole = this.props.roleRedux
            // let arrPosition = this.props.positionRedux
            //   console.log("create:", action);
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                image: this.state.image
            })
            this.props.fetchAllUser();
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                image: this.state.image
            })
        }
        // setTimeout(() => {
        //     this.props.fetchAllUser();
        // }, 1000)
    }

    handleEditUser = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        // console.log(user);
        console.log(user.id);
        this.setState({
            email: user.email,
            password: 'harcode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            roleId: user.roleId,
            positionId: user.positionId,
            previewImg: imageBase64,
            image: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }


    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        // let getGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName, address, phoneNumber, gender, roleId, positionId, image } = this.state;
        // console.log("Check:", genders);
        // console.log("Redux: ", this.props.genderRedux);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Quản lý Redux
                </div>
                {/* <div>{getGender === true ? 'Loading gender' : ''}</div> */}
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            {/* <div className='col-12'><FormattedMessage id='user-manager.add'></FormattedMessage></div> */}
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type='text' placeholder='Nhập email của bạn'
                                    value={email} onChange={(event) => this.changeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.password'></FormattedMessage></label>
                                <input className='form-control' type='password' placeholder='Nhập password của bạn'
                                    value={password} onChange={(event) => this.changeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.first-name'></FormattedMessage></label>
                                <input className='form-control' type='text' placeholder='Nhập firest name của bạn'
                                    value={firstName} onChange={(event) => this.changeInput(event, 'firstName')}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.last-name'></FormattedMessage></label>
                                <input className='form-control' type='text' placeholder='Nhập last name của bạn'
                                    value={lastName} onChange={(event) => this.changeInput(event, 'lastName')}></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='user-manager.address'></FormattedMessage></label>
                                <input className='form-control' type='text' placeholder='Nhập address name của bạn'
                                    value={address} onChange={(event) => this.changeInput(event, 'address')}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.phone-number'></FormattedMessage></label>
                                <input className='form-control' type='text' placeholder='Nhập phone number của bạn'
                                    value={phoneNumber} onChange={(event) => this.changeInput(event, 'phoneNumber')}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.gender'></FormattedMessage></label>
                                <select className="form-control" value={gender} onChange={(event) => this.changeInput(event, 'gender')}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === languages.VI ? item.value_Vi : item.value_En}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.role'></FormattedMessage></label>
                                <select className="form-control" value={roleId} onChange={(event) => this.changeInput(event, 'roleId')}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === languages.VI ? item.value_Vi : item.value_En}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.position'></FormattedMessage></label>
                                <select className="form-control" value={positionId} onChange={(event) => this.changeInput(event, 'positionId')}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === languages.VI ? item.value_Vi : item.value_En}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='user-manager.image'></FormattedMessage></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleImage(event)}></input>
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id='user-manager.upload-image'></FormattedMessage><i className='fas fa-upload'></i></label>
                                    <div className='preview-img' style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                        onClick={() => this.openPreviewImg()}></div>
                                </div>
                            </div>

                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='user-manager.save' /> : <FormattedMessage id='user-manager.add' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUser={this.handleEditUser}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}>
                    </Lightbox>
                }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
        editUser: (data) => dispatch(actions.editUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => (dispatch)(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
