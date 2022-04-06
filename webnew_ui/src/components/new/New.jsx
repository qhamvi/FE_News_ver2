import { Link } from "react-router-dom"
import "./new.css"

export default function New({ new1 }) {
    console.log(new1)
    const IMAGE_URL = "http://localhost:5000/Images/";
    return (
        <div className="new">
            {new1.ImageFileName && (
                <img
                    className="newImg"
                    // src={`http://localhost:5000/Images/${new1.ImageFileName}`}
                    src={`${IMAGE_URL+new1.ImageFileName}`}
                    alt=""
                />
            )}

            <div className="newInfo">
                <div className="newTops">
                    <Link to={`?topic=${new1.Topic}`} className="link">
                    <span className="newTop">{new1.Topic}</span>
                    </Link>
                    {/* <span className="newTop">{new1.Topic}</span> */}
                </div>
                <Link to={`/new/${new1.NewId}`} className="link">
                    <span className="newTitle">
                        {new1.NewTitle}
                    </span>
                </Link>


                <span className="newDate"> Create: {new Date (new1.createDate).toDateString()}</span>
                <span className="newDate">Publish: {new Date (new1.publishDate).toDateString()}</span>
            </div>
            <p className="newSummary">
                {new1.NewSummary}
            </p>
        </div>
    )
}
