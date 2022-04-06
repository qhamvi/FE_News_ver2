import "./singleNew.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
export default function SingleNew() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [neww, setNew] = useState(null)
    const IMAGE_URL = "http://localhost:5000/Images/";
    useEffect(() => {
        const getNew = async () => {

            const ress = await axios.get("/new/" + path);
            setNew(ress.data);
            console.log(ress.data);
        };
        getNew();
    }, [path]);



    console.log(neww)
    return (
        <>
            {
                neww != null && (
                    <>
                        {/* bỏ code ngay đây */}

                        <div className="singleNew">
                            <div className="singleNewWrapper">
                                <img
                                    className="singleNewImg"
                                    src={`${IMAGE_URL+neww[0].ImageFileName}`}
                                    alt=""
                                />
                                <h1 className="singleNewTitle">
                                    {neww[0].NewTitle}
                                    
                                </h1>
                                <div className="singleNewInfo">
                                    {/* <span className="singleNewEditor">
                                        Editor: <b>ViVi</b>
                                    </span> */}
                                    <span className="singleCreateDate">
                                    Create:    {new Date (neww[0].createDate).toDateString()}
                                        {/* {neww[0].createDate} */}
                                    </span>
                                    <span className="singlePublishDate">
                                    {/* {new Date(neww[0].publishDate).toDateString()} */}
                                    {/* {neww[0].publishDate} */}
                                    </span>
                                    <span className="singleTopic">
                                    Topic: {neww[0].Topic}
                                    </span>
                                </div>
                                <p className="singleNewSummary">
                                    {neww[0].NewSummary}
                                </p>
                                <p className="singleNewConntent">
                                    {neww[0].NewContent}
                                </p>
                                <p className="singleNewAuthor">Author: <b>{neww[0].User}</b> </p>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}