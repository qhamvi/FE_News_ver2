import Header from "../../components/header/Header";
import News from "../../components/news/News";
import Sidebar from "../../components/sidebar/Sidebar";
import ViewPositionComponent from "../../components/viewposition/ViewPositionComponent";
import "./home.css";
import { useEffect, useState } from 'react';
import axios from "axios";
import {useLocation} from "react-router";
export default function Home() {

    const [news, setNews] = useState(null);
      
    const {search} = useLocation();
    useEffect(() => {
        const fetchNews = async () => {
            const res = await axios.get("/new/true/"+search)
            setNews(res.data)
        }
        fetchNews()
    }, [search])
    return (
        <> {news != null && (
            <>
                <Header />
                <div className="home">
                    <News news={news} />
                    <Sidebar />
                </div>
            </>
        )}
        </>
        
    )
}
