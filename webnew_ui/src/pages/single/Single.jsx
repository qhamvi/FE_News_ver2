import Sidebar from "../../components/sidebar/Sidebar"
import SingleNew from "../../components/singleNew/SingleNew"
import "./single.css"

export default function Single() {
    return (
        <div className="single">
            <SingleNew/>
            <Sidebar/>
        </div>
    )
}
