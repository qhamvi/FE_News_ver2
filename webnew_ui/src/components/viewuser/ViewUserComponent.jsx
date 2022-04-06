import React, { Component } from 'react';
import { variables } from '../../services/Variables';
import axios from "axios";
export class ViewUserComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            positions: [],
            users: [],
            modalTitle: "",
            UserId: 0,
            UserName: "",
            Account: "",
            Password: "",
            Phone:"",
            Email: "",
            PhotoFileName: "anonymous.png",
            Position: "",
            PhotoPath: variables.PHOTO_URL
        }
    }
    

    refreshList() {

        fetch(variables.API_URL + 'user')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });

        fetch(variables.API_URL + 'position')
            .then(response => response.json())
            .then(data => {
                this.setState({ positions: data });
            });
    }
    

    componentDidMount() {
        this.refreshList();
    }

    changeUserName = (e) => {
        this.setState({ UserName: e.target.value });
    }
    changeAccount = (e) => {
        this.setState({ Account: e.target.value });
    }
    changePassword = (e) => {
        this.setState({ Password: e.target.value });
    }
    changePhone = (e) => {
        this.setState({ Phone: e.target.value });
    }
    changeEmail = (e) => {
        this.setState({ Email: e.target.value });
    }
    changePosition = (e) => {
        this.setState({ Position: e.target.value });
    }
    // changeDateOfJoining = (e) => {
    //     this.setState({ DateOfJoining: e.target.value });
    // }

    addClick() {
        this.setState({
            modalTitle: "Add User",
            UserId: 0,
            UserName: "",
            Account: "",
            Password: "",
            Phone:"",
            Email: "",
            PhotoFileName: "anonymous.png",
            Position: ""
        });
    }
    editClick(user) {
        this.setState({
            modalTitle: "Edit User",
            UserId: user.UserId,
            UserName: user.UserName,
            Account: user.Account,
            Password: user.Password,
            Phone: user.Phone,
            Email: user.Email,
            PhotoFileName: user.PhotoFileName,
            Position: user.Position
        });
    }

    createClick() {
        fetch(variables.API_URL + 'user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: this.state.UserName,
                Account: this.state.Account,
                Password: this.state.Password,
                Phone: this.state.Phone,
                Email: this.state.Email,
                PhotoFileName: this.state.PhotoFileName,
                Position: this.state.Position
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'user', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: this.state.UserId,
                UserName: this.state.UserName,
                Account: this.state.Account,
                Password: this.state.Password,
                Phone: this.state.Phone,
                Email: this.state.Email,
                PhotoFileName: this.state.PhotoFileName,
                Position: this.state.Position
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'user/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'user/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoFileName: data });
            })
    }

    render() {
        const {
            positions,
            users,
            modalTitle,
            UserId,
            UserName,
            Account,
            Password,
            Phone,
            Email,
            PhotoPath,
            PhotoFileName,
            Position
         } = this.state;

        return (
            <div class="container">

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add User
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                UserId
                            </th>
                            <th>
                                UserName
                            </th>
                            <th>
                                Account
                            </th>
                            <th>
                                Password
                            </th>
                            <th>
                                Phone
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Position
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <tr key={user.UserId}>
                                <td>{user.UserId}</td>
                                <td>{user.UserName}</td>
                                <td>{user.Account}</td>
                                <td>{user.Password}</td>
                                <td>{user.Phone}</td>
                                <td>{user.Email}</td>
                                <td>{user.Position}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(user)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(user.UserId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">User Name</span>
                                            <input type="text" className="form-control"
                                                value={UserName}
                                                onChange={this.changeUserName} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Account</span>
                                            <input type="text" className="form-control"
                                                value={Account}
                                                onChange={this.changeAccount} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Password</span>
                                            <input type="text" className="form-control"
                                                value={Password}
                                                onChange={this.changePassword} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Phone</span>
                                            <input type="text" className="form-control"
                                                value={Phone}
                                                onChange={this.changePhone} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Email</span>
                                            <input type="text" className="form-control"
                                                value={Email}
                                                onChange={this.changeEmail} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Position</span>
                                            <select className="form-select"
                                                onChange={this.changePosition}
                                                value={Position}>
                                                {positions.map(user => <option key={user.PositionId}>
                                                    {user.PositionName}
                                                </option>)}
                                            </select>
                                        </div>

                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                            src={PhotoPath + PhotoFileName} />
                                        <input className="m-2" type="file" onChange={this.imageUpload} />
                                    </div>
                                </div>

                                {UserId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {UserId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewUserComponent
