import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from "../../../store/actions";

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';

// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import _ from 'lodash';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
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
            userRedux: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                userRedux: this.props.listUser
            })
        }
    }

    deleteUser = (id) => {
        this.props.deleteUser(id)
    }
    editUser = (user) => {
        this.props.handleEditUser(user);
    }
    render() {
        let userArr = this.state.userRedux
        // console.log("list user:", this.props.listUser);
        return (
            <React.Fragment>
                <table id="tableManageUser">
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>

                    {userArr && userArr.length > 0 &&
                        userArr.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>

                                    <td>
                                        <button onClick={() => this.editUser(item)}
                                        ><i class="fas fa-user-edit" ></i></button>
                                        <button onClick={() => this.deleteUser(item.id)}
                                            className='btn-delete' ><i class="fas fa-trash"></i></button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
