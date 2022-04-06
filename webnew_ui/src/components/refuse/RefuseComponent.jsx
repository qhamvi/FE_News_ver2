import React, { Component } from 'react';
import { useContext } from 'react';
import { variables } from '../../services/Variables';
import { Link } from "react-router-dom";

export class RefuseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [],
            topics: [],
            users: [],
            modalTitle: "",
            NewId: 0,
            NewTitle: "",
            NewSummary: "",
            NewContent: "",
            NewStatus: false,
            Topic: "",
            User: "",
            createDate: "",
            pulishDate: "",
            ImageFileName: "nen.jpg",
            Reason: "",
            PhotoPath: variables.IMAGE_URL
        }
    }
    refreshList() {

        fetch(variables.API_URL + 'user')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
        fetch(variables.API_URL + 'topic')
            .then(response => response.json())
            .then(data => {
                this.setState({ topics: data });
            });

        fetch(variables.API_URL + 'new')
            .then(response => response.json())
            .then(data => {
                this.setState({ news: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeNewTitle = (e) => {
        this.setState({ NewTitle: e.target.value });
    }
    changeNewSummary = (e) => {
        this.setState({ NewSummary: e.target.value });
    }
    changeNewContent = (e) => {
        this.setState({ NewContent: e.target.value });
    }
    changeUser = (e) => {
        this.setState({ User: e.target.value });
    }
    changeTopic = (e) => {
        this.setState({ Topic: e.target.value });
    }
    changecreateDate = (e) => {
        this.setState({ createDate: e.target.value });
    }
    changepublishDate = (e) => {
        this.setState({ publishDate: e.target.value });
    }
    changeReason = (e) => {
        this.setState({ Reason: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add New",
            NewId: 0,
            NewTitle: "",
            NewSummary: "",
            NewContent: "",
            NewStatus: false,
            User: "",
            Topic: "",
            createDate: "",
            publishDate: "",
            ImageFileName: "nen.jpg",
            Reason: ""
        });
    }
    editClick(new1) {
        this.setState({
            modalTitle: "Edit New",
            NewId: new1.NewId,
            NewTitle: new1.NewTitle,
            NewSummary: new1.NewSummary,
            NewContent: new1.NewContent,
            NewStatus: new1.NewStatus,
            User: new1.User,
            Topic: new1.Topic,
            createDate: new1.createDate,
            publishDate: new1.publishDate,
            ImageFileName: new1.ImageFileName,
            Reason: new1.Reason
        });
    }

    createClick() {
        fetch(variables.API_URL + 'new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NewTitle: this.state.NewTitle,
                NewSummary: this.state.NewSummary,
                NewContent: this.state.NewContent,
                // NewStatus: this.state.NewStatus,
                User: this.state.User,
                Topic: this.state.Topic,
                // createDate: this.state.createDate,
                // publishDate: this.state.publishDate,
                ImageFileName: this.state.ImageFileName,
                // Reason: this.state.Reason
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
    accptClick() {
        fetch(variables.API_URL + 'new/acceptNew', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NewId: this.state.NewId,

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
    refuseClick() {
        fetch(variables.API_URL + 'new/refuseNew', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NewId: this.state.NewId,
                Reason: this.state.Reason

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
        fetch(variables.API_URL + 'new', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NewId: this.state.NewId,
                NewTitle: this.state.NewTitle,
                NewSummary: this.state.NewSummary,
                NewContent: this.state.NewContent,
                NewStatus: this.state.NewStatus,
                User: this.state.User,
                Topic: this.state.Topic,
                createDate: this.state.createDate,
                publishDate: this.state.publishDate,
                ImageFileName: this.state.ImageFileName,
                Reason: this.state.Reason
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
            fetch(variables.API_URL + 'new/' + id, {
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

        fetch(variables.API_URL + 'new/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ ImageFileName: data });
            })
    }

    render() {
        const {
            news,
            topics,
            users,
            modalTitle,
            NewId,
            NewTitle,
            NewSummary,
            NewContent,
            NewStatus,
            Topic,
            User,
            createDate,
            publishDate,
            ImageFileName,
            Reason,
            PhotoPath
        } = this.state;

        return (
            <div class="container">

                {/* <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add New
                </button> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                NewId
                            </th>
                            <th>
                                NewTitle
                            </th>
                            <th>
                                NewStatus
                            </th>
                            <th>
                                User
                            </th>
                            <th>
                                createDate
                            </th>
                            <th>
                                publishDate
                            </th>
                            <th>
                                Reason
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map(neww =>
                            <tr key={neww.NewId}>
                                <td>{neww.NewId}</td>
                                <td>{neww.NewTitle}</td>
                                <td>{neww.NewStatus}</td>
                                <td>{neww.User}</td>
                                <td>{neww.createDate}</td>
                                <td>{neww.publishDate}</td>
                                <td>{neww.Reason}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1">   
                                    <Link className="link" to={`/new/${neww.NewId}`}> View</Link>
                                    </button>
                                    {/* <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(neww.NewId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button> */}

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(neww)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
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
                                <h5 className="modal-title">Accept or Refuse New  :  {NewId}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">
                                        <p>
                                            NewTitle: {NewTitle}
                                        </p>

                                        <p>
                                            Summary: {NewSummary}
                                        </p>
                                        <p>
                                            Conntent: {NewContent}
                                        </p>
                                        <p>
                                            Topic: {Topic}
                                        </p>
                                        {/* <div className="input-group mb-3">
                                            <span className="input-group-text">New Title</span>
                                            <input type="text" className="form-control"
                                                value={NewTitle}
                                                onChange={this.changeNewTitle}
                                            />
                                        </div> */}
                                        {/* <div className="input-group mb-3">
                                            <span className="input-group-text">New Summary</span>
                                            <input type="text" className="form-control"
                                                value={NewSummary}
                                                onChange={this.changeNewSummary} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">New Content</span>
                                            <input type="text" className="form-control"
                                                value={NewContent}
                                                onChange={this.changeNewContent} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">User</span>
                                            <input type="text" className="form-control"
                                                value={User}
                                                onChange={this.changeUser} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Topic</span>
                                            <input type="text" className="form-control"
                                                value={Topic}
                                                onChange={this.changeTopic} />
                                        </div> */}
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Reason</span>
                                            <input type="text" className="form-control"
                                                value={Reason}
                                                onChange={this.changeReason} />
                                        </div>


                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                            src={PhotoPath + ImageFileName} />
                                        {/* <input className="m-2" type="file" onChange={this.imageUpload} /> */}
                                    </div>
                                </div>
                                {NewId != 0 ?
                                    <button type="button"
                                        className="btn btn-light mr-1 "
                                        onClick={() => this.accptClick()}
                                    >Accept</button>
                                    : null}

                                {NewId != 0 ?
                                    <button type="button"
                                        className="btn btn-light mr-1 "
                                        onClick={() => this.refuseClick()}
                                    >Refuse</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default RefuseComponent
