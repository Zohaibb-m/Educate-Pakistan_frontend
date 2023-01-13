import React from "react-dom"
import { Link } from "react-router-dom";
import User_Dashboard from "./User_Dashboard";
import Login_Context from "../Context/Login_Context";
import { useContext } from "react";
import { useEffect } from "react";
import User_Context from "../Context/User_Context";
function Home(){
  const {isLogin} = useContext(Login_Context)
  const {User,setUser} = useContext(User_Context)
  useEffect(()=>{
    setUser(User)
  },[isLogin])
  if (isLogin)
    return (
      <div>
    <User_Dashboard />
    </div>
    );
  else return(
    <div>
        <h1>Home Page </h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
  )
}

export default Home;