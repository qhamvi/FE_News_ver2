import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"
import { useContext, useState, useEffect } from "react";
import axios from "axios";


export default function TopBar() {

    const PHOTO_URL = "http://localhost:5000/Photos/";
    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    console.log(user)

    return (
        <div className="top">
            <div className="topLeft">
                <Link className="link" to="/">HOME</Link>
                {/* <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i> */}
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/viewposition"> {user && "POSITION"}</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/viewtopic">{user && "TOPIC"}</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/viewuser">{user && "USER"}</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/create">{user && "CREATE"}</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/management">{user && "MANAGEMENT"}</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/refuse">{user && "REFUSE & ACCEPT"}</Link>
                    </li>

                </ul>
            </div>
            <div className="topRight">
                <ul className="topList">
                    <li className="topListItem">
                    <Link className="link" to="/" onClick={handleLogout} >{user && "LOGOUT"}</Link> 
                    </li>
                </ul>
                {
                    (user) ? (
                        
                        <img
                            className="topImg"
                            src={`${PHOTO_URL + user[0].PhotoFileName}`}
                            alt=""
                        />
                        
                    ) :
                        (

                            <ul className="topList">
                                <li className="topListItem">
                                    <Link className="link" to="/login">LOGIN</Link>
                                </li>
                            </ul>
                        )
                }
                {/* <i className="topSettingIcon fas fa-search"></i> */}
                {
                    user && (
                        // <i className="topSettingIcon fas fa-cog" to="/settings"></i>
                        <Link className="topSettingIcon fas fa-cog" to="/settings"></Link>
                    )
                }
            </div>
        </div>
    )
}