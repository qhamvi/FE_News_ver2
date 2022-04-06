import { Link } from "react-router-dom"
import "./login.css"
import { useRef, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  // const [user, setUser] = useState(null)
  const accountRef = useRef()
  const passwordRef = useRef()

  // useEffect(() => {
  //   const getUser = async () => {
  //     const ress = await axios.get("/User/login/minh:358");
  //     setUser(ress.data);
  //     console.log(ress.data);
  //   };
  //   getUser();
  // }, []);
  const {dispatch} = useContext(Context)
  const handleSubmit = async(e) =>{
    e.preventDefault()
    dispatch({type: "LOGIN_BEFORE"})
    try{
      // console.log(accountRef.current.value + passwordRef.current.value)
      const data = await axios.get("/User/login/"+accountRef.current.value+":"+passwordRef.current.value)
      dispatch({type: "LOGIN_SUCCESS", payload: data.data})
      console.log(data.data)
    }catch{
      alert("Something is wrong")
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">LOGIN</span>
      <form className="loginForm" method="post" onSubmit={(e)=>handleSubmit(e)}>
        <label>Account</label>
        <input type="text" className="loginInput" ref={accountRef} placeholder="Enter your account..." />
        <label>Password</label>
        <input type="password" className="loginInput" ref={passwordRef} placeholder="Enter your password..." ></input>
        {/* <label>Position</label>
        <input type="text" className="loginInput" placeholder="Enter your position..." /> */}
        <button className="loginButton" type="submit">Login</button>
      </form>
      <button className="loginBackButton">
        <Link className="link" to="/">Back</Link>
      </button>
    </div>
  )
}
