import { useContext, useState, useRef } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import ManageComponent from "../../components/manage/ManageComponent";
export default function Management() {
    return (
        <div>
            <ManageComponent />
        </div>

    );
}
