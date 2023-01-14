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
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-6">
            <img src={require("../images/student-teacher.png")} alt="Education" height="400" width="400" />
            
        </div>
        <div className="col-md-6 center">
          <h2>Learn the Process of<br /><span style={{color:"aqua",fontSize:"larger",textDecoration:" underline"}}>Learning!!</span></h2>
          <p>A team of young individuals trying to provide Pakistani Children with Quality Education with fun techniques and cool methods</p>
        <div className="row">
            <div className="col-md-6">
            <button className="btn btn-primary or b1" style={{width:"100%"}}>Log In</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary or b1" style={{width:"100%"}}>Sign Up</button>
              </div>
        </div>
          
         
     
        </div>
      </div>

    
      <div className="row center">
        <div className="col-md-12" style={{textAlign:"center"}}>
          <h2>Our Motto</h2>
      </div>
        <div className="col-md-4 center-text cercle c1">
          <p>We believe in the power of knowledge and strive to provide you with the resources you need to reach your full potential. Whether you're a student or a lifelong learner, we've got something for you.</p>
        </div>
        <div className="col-md-4 center-text cercle c2">

          <p>This website is dedicated to the technology of education for kids. Our mission is to empower children to learn and grow through innovative, interactive and age-appropriate technology and resources.</p>
        </div>
        <div className="col-md-4 center-text cercle c3">

          <p>Focused on children's education and family growth. Our goal is to provide tools and resources to help families raise happy, healthy, and well-educated kids, by providing valuable educational contents to the parents that will benefit the whole family.</p>
        </div>
      </div>

      <div className="row b-grey">

        <div className="col-md-8 center">
            <p style={{color: "gray"}}>For Learners</p>
          <h2>You are just One step<br/><span style={{color:"aqua",fontSize:"larger",textDecoration: "underline"}}>Away!!</span></h2>
          <p>Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.</p>

     
        </div>
        <div className="col-md-4">
            <br /><br /><br />
            <img src={require('../images/ed-wheel.png')} alt="Education" height="300" width="300" />
            
        </div>
      </div>

      <div className="row center">
        <div className="col-md-12" style={{textAlign:"center"}}>
            <h2>Why Educate <span style={{color:"aqua",fontSize:"larger",textDecoration:" underline"}}>Pakistan</span> Works</h2>
        </div>
        <div className="col-md-4 center-text">
          <img src={require("../images/image1.png")} className="img-fluid" width="200" height="200" alt="Responsive image" />
          <br />
          <h3>Power of knowledge</h3><br/>
          <p>We believe in the power of knowledge and strive to provide you with the resources you need to reach your full potential. Whether you're a student or a lifelong learner, we've got something for you.</p>
        </div>
        <div className="col-md-4 center-text">
          <img src={require("../images/image2.png")} className="img-fluid" width="200" height="200" alt="Responsive image"/>
          <h3>Empower Children</h3><br/>
          <p>This website is dedicated to the technology of education for kids. Our mission is to empower children to learn and grow through innovative, interactive and age-appropriate technology and resources.</p>
        </div>
        <div className="col-md-4 center-text">
          <img src={require("../images/image3.png")} className="img-fluid" width="200" height="200" alt="Responsive image"/>
          <h3>Raise Happy Family</h3><br/>
          <p>Focused on children's education and family growth. Our goal is to provide tools and resources to help families raise happy, healthy, and well-educated kids, by providing valuable educational contents to the parents that will benefit the whole family.</p>
        </div>
      </div>


    </div>
  )
}

export default Home;