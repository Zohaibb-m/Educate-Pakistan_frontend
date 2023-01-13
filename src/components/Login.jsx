import React, {useState,useEffect} from "react";
import Axios from 'axios'
import {BrowserRouter as Router, Route, Link,  useNavigate } from 'react-router-dom'
import Login_Context from "../Context/Login_Context";
import { useContext } from "react";
import User_Context from "../Context/User_Context";
function Login(){
    const {isLogin,setLogin}=useContext(Login_Context)
    const {User,setUser} = useContext(User_Context)
    let [user,setuser]=useState({firstname:"",lastname:"",gender:"",email:"",password:"",birthday:"",cpassword:"",mobileNo:""})
    let [err,setErr]=useState("")
    const navigate=useNavigate();

    const onChangeInput=e=>{
        let {name,value}=e.target;
        setuser({...user,[name]:value})
        setErr('') 
    }
    const loginSubmit= async e=>{
        e.preventDefault();
        try {
            const res=await Axios.post("https://educate-pakistan-server.herokuapp.com/auth/local",{
                identifier:user.email,
                password:user.password
            })
            setuser({firstname:"",lastname:"",gender:"",email:"",password:"",birthday:"",cpassword:"",mobileNo:""})
            localStorage.setItem('tokenStore',res.data.jwt)
            setUser(res.data.user)
            setLogin(true)
            
        } catch (err) {
            err.response.data.data[0].messages[0].message && setErr("Invalid Email or Password!")
        }
    }

    const gStyle={
        backgroundColor:'#df4930 !important'
    }
    if (isLogin)navigate("/")
    return (
        <section className="ftco-section" style={{backgroundColor: "#fafafa"}}> 
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="img" style={{backgroundColor: "#5d9691"}}>
                                    <div >
                                        <h1 className="welcome-content">Login</h1>
                                        <p className="welcome-content-p">Glad you're back Captain</p>
                                    </div>
                                </div>
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="form-group mb-3">
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3 fbStyle"> <span className="fa fa-large fa-facebook-square" ></span> | Login In Using Facebook </button>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="form-control btn btn-primary btn-social btn-facebook rounded submit px-3 gStyle"><span className=" fa fa-google-plus-square"></span> | Login In Using Google+ </button>
                                    </div>
                                    <form onSubmit={loginSubmit} className="signin-form">
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="email">Email</label>
                                            <input type='email' required name="email" id="login-email" value={user.email} onChange={onChangeInput} className="form-control" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label" htmlFor="password">Password</label>
                                            <input type='password' required className="form-control" name="password" id="login-password" value={user.password} autoComplete="true" onChange={onChangeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                                            <h6 className="error">{err}</h6>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50 text-left">
                                            </div>
                                            <div className="w-50 text-right justify-content-end">
                                                <a href="#">Forgot Password</a>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="text-center">Not a User?<button className="btn-signup"><Link to="/register">SignUp</Link></button></p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;