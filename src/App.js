import Axios from "axios";
import { useState,useEffect } from "react";
import Login from "./components/Login"
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from "./components/Register"
import Home from "./components/Home"
import Header from "./components/Header"
import Course from "./components/Course";
import Footer from "./components/Footer"
import Login_Context from "./Context/Login_Context";
import User_Context from "./Context/User_Context"
import Lesson from "./components/Lesson"
import axios from "axios";
import Quiz from "./components/Quiz";
import User_Dashboard from "./components/User_Dashboard";
function App() {
  var [isLogin,setLogin]=useState(false);
  var [User,setUser]=useState({})
  
  useEffect(()=>{
    const checkLogin= async()=>{
      const token=localStorage.getItem('tokenStore')  || null;
      if(token){
        axios.get("https://educate-pakistan-server.herokuapp.com/users/me",{
          headers:{
            Authorization:`Bearer ${token}`
            }})
            .then(res=>{
              // console.log(res)
              setUser(res.data)
              setLogin(true) 
            })
      }
      else{
        localStorage.clear()
        setLogin(false)
      }
    }
    checkLogin()
  },[])
   
  return (
    <div>
    <Login_Context.Provider value={{isLogin, setLogin}}>
    <User_Context.Provider value={{User,setUser}}>
    <Header />
    <Router>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    {/* <Route path="/Courses" element={<Courses />} /> */}
    <Route path="/courses/:courseID" element={<Course />} />
    <Route path="/lessons/:lessonID" element={<Lesson />} />
    <Route path="/quizzes/:quizID" element={<Quiz />} />
    <Route path="/profile" element={<User_Dashboard />} />
    </Routes>
    </Router>
    <Footer />
    </User_Context.Provider>
    </Login_Context.Provider>
    </div>
  );
}

export default App;

