import New from "../new/New"
import "./news.css"
import React, { Component } from 'react';

export default function News({news}) {
    return (
        <div className="news">
            {news.map((p)=>(
                <New new1 = {p}/>
            ))}
        </div>
    );
}  
 
  