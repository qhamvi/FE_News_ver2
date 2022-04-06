import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { getByLabelText } from "@testing-library/dom"
import { useContext, useState, useEffect } from "react"
import { Context } from "../../context/Context"

export default function Settings() {

    const {user} = useContext(Context)

    const[username, setUserName] = useState('')
    const[position, setPosition] = useState('')
    const[email, setEmail] = useState('')
    const [phone,setPhone] = useState('')
    useEffect(() => {
        setUserName(user[0].UserName)
        setEmail(user[0].Email)
        setPosition(user[0].Position)
        setPhone(user[0].Phone)
    }, [user])

    

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Your Account</span>
                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={`http://localhost:5000/Photos/${user[0].PhotoFileName}`}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display: "none"}} />
                    </div>
                    <label>User Name</label>
                    <input type="text"  value={username}/>
                    <label>Email</label>
                    <input type="email"   value={email}/>
                    <label>Phone</label>
                    <input type="email"   value={phone}/>
                    <label>Position</label>
                    <input type="text" value={position}/>
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
