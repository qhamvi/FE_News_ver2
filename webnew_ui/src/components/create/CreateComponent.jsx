import React, { Component } from 'react';
import { useContext } from 'react';
import { variables } from '../../services/Variables';

export class CreateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [],
            topics: [],
            users: [],
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
            NewId: 0,
            NewTitle: "",
            NewSummary: "",
            NewContent: "",
            NewStatus: false,
            User: "",
            Topic: "",
            createDate: "",
            publishDate: "",
            ImageFileName: "anonymous.png",
            Reason: ""
        });
    }
    editClick(new1) {
        this.setState({
            modalTitle: "Edit New",
            NewId: new1.NewId,
            NewTitle: new1.NewTile,
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
            pulishDate,
            ImageFileName,
            Reason,
            PhotoPath
        } = this.state;

        return (
            <div className="write">
                <img
                    className="writeImg"
                    src={PhotoPath + ImageFileName}
                    alt=""
                />
                <input type="file" name="" id="fileInput" onChange={this.imageUpload} style={{ display: "none" }} />
                <form className="writeForm" >
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fas fa-plus"></i>
                        </label>

                        <input
                            type="text"
                            placeholder="Title"
                            className="writeInput"
                            autoFocus={true}
                            value={NewTitle}
                            onChange={this.changeNewTitle}
                        />

                    </div>

                    <div className="text">
                        <h3>Summary</h3>
                        <div className="writeFormGroup">
                            <textarea placeholder="Enter your summary...."
                                type="text"
                                className="writeInput writeText"
                                value={NewSummary}
                                onChange={this.changeNewSummary}

                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="text">
                        <h3>Content</h3>
                        <div className="writeFormGroup">
                            <textarea placeholder="Enter your content...."
                                type="text"
                                className="writeInput writeText"
                                value={NewContent}
                                onChange={this.changeNewContent}
                            >
                            </textarea>
                        </div>
                    </div>
                    {/* <div className="text">
                        <h3>User</h3>
                        <div className="writeFormGroup">
                            <textarea placeholder="Enter your User...."
                                type="text"
                                className="writeInput writeText"
                                value={User}
                                onChange={this.changeUser}
                            >
                            </textarea>
                        </div>
                    </div> */}
                    {/* <div className="text">
                        <h3>Topic</h3>
                        <div className="writeFormGroup">
                            <textarea placeholder="Enter your topic...."
                                type="text"
                                className="writeInput writeText"
                                value={Topic}
                                onChange={this.changeTopic}
                            >
                            </textarea>
                        </div>
                    </div> */}
                    <div className="text">
                        <h3>Topic</h3>
                        <div className="writeFormGroup">
                            <select className="writeInput writeText"
                                onChange={this.changeTopic}
                                value={Topic}>
                                {topics.map(neww => <option key={neww.TopicId}>
                                    {neww.TopicName}
                                </option>)}
                            </select>
                        </div>
                        <h3>User</h3>
                        <div className="writeFormGroup">
                            <select className="writeInput writeText"
                                onChange={this.changeUser}
                                value={User}>
                                {users.map(neww => <option key={neww.UserId}>
                                    {neww.UserName}
                                </option>)}
                            </select>
                        </div>
                        
                       
                        {/* <div className="writeFormGroup">
                            <textarea placeholder="Enter your User...."
                                type="text"
                                className="writeInput writeText"
                                value={User}
                                onChange={this.changeUser}
                            >
                            </textarea>
                        </div> */}

                    </div>

                    <div> <button className="writeSubmit" onClick={() => this.createClick()} >Publish</button></div>

                </form>
            </div>
        )
    } 
}
export default CreateComponent
