import "./sidebar.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
    const [tops, setTops] = useState([]);

    useEffect(() => {
        const getTops = async () => {
            const res = await axios.get("/topic/");
            setTops(res.data);
        };
        getTops();
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    className="sidebarImg"
                    src="https://i.pinimg.com/originals/59/55/95/5955953c10071ecc4d9f56b51f79a789.jpg"
                    alt=""
                />
                <p>
                    My name is Vi. I am from Vietnam.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">TOPICS</span>
                <ul className="sidebarList">
                    {tops.map((c) => (
                        <Link to={`/topic=${c.TopicName}`}><li className="sidebarListItem">{c.TopicName}</li>
                        </Link>
                    ))}


                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US </span>
                <div className="sidebarSocil">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
