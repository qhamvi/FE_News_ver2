import { useContext, useState, useRef } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
export default function Write() {
    const [title, setTitle] = useState("");
    const [summ, setSummary] = useState("");
    const [cont, setCont] = useState("");
    const [top, setTop] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const titleRef = useRef()
    const summaRef = useRef()
    const contRef = useRef()
    const topRef = useRef()
    const imageRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newNew = {
            NewTitle: titleRef.current.value,
            NewSummary: summaRef.current.value,
            NewContent: contRef.current.value,
            Topic: topRef.current.value,
            User: user[0].UserName,
            ImageFileName: imageRef.current.value
        };
        if (file) {
            const data = new FormData();
            //   formData.append("file", e.target.files[0], e.target.files[0].name);

            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newNew.ImageFileName = filename;
            try {
                await axios.post("/savefile", data);
            } catch (err) { }
        }
        try {
            const res = await axios.post("/new", newNew);
            //   window.location.replace("/new/" + res.data.NewId);
        } catch (err) { }
    };
    return (
        <div className="write">
            {file && (

                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                    ref={imageRef} 
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        ref={titleRef}
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your Summary..."
                        type="text"
                        className="writeInput writeText"
                        ref={summaRef}
                        onChange={e => setSummary(e.target.value)}
                    ></textarea>
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your Content..."
                        type="text"
                        className="writeInput writeText"
                        ref={contRef}
                        onChange={e => setCont(e.target.value)}
                    ></textarea>
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your Top..."
                        type="text"
                        className="writeInput writeText"
                        ref={topRef}
                        onChange={e => setTop(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}
