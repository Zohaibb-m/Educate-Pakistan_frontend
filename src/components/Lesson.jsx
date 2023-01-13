import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {useState, useEffect, useContext} from "react"
import Axios from "axios"
import User_Context from "../Context/User_Context";
import Login_Context from "../Context/Login_Context";

function Lesson() {
    let {lessonID}=useParams()
    const {User}=useContext(User_Context)
    const {isLogin}=useContext(Login_Context)
    console.log(lessonID)
    let [state,setState]=useState({
        lesson:false
    })
    let [found,setFound]=useState(false)
    let [checked,setChecked]=useState(false)
    if(isLogin && state.lesson && !checked){
    for (let i=0;i<User.progresses.length;i++){
        let prog=Axios.get("https://educate-pakistan-server.herokuapp.com/progresses/"+User.progresses[i])
        .then(response=>{
            console.log("res",response)
            if(response.data.quizID===state.lesson.quiz.id){
                setFound(response.data)
                console.log(found)
            }
        })
        }
        setChecked(true)
        }
        useEffect(()=>{async function getData(){
        await Axios.get("https://educate-pakistan-server.herokuapp.com/lessons/"+lessonID)
            .then((response)=>{
                setState({
                    lesson:response.data
                })
            })
        
        }
        getData() 
    }, [])
    
    console.log(state.lesson)
    if(!state.lesson)return(
        <div>
            Loading...
        </div>
    )
    else 
    return (
        <div className="lesson-page-container">
            <div className="lesson-page-sidebar">
            <div className="lesson-sidebar">
                <div className="lesson-content-container">
                    <div className="lesson-content">
                        <div className="course-name-container">
                            <a className="course-name">{state.lesson.course.courseName}</a>
                        </div>
                        <div className="lesson-name-container">
                            <a className="lesson-name"><span className="color-blue">Lesson </span><br />{state.lesson.title}</a>
                        </div>
                        <ul className="lesson-resources">
                            <li className="lesson-resource-item active">
                                <a href="#">
                                    <span>
                                        <div className="item">
                                            Lesson Video
                                        </div>
                                    </span>
                                </a>
                            </li>
                            <li className="lesson-resource-item">
                                <a href="#">
                                    <span>
                                        <div className="item">
                                        {state.lesson.quiz.quizName}
                                        </div>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="lessons-container">
            <div className="lesson-contents-container">
                <div className="content-container">
                    <div className="video-heading-container">
                        <h3 className="video-heading">Video Lesson</h3>
                    </div>
                    <div className="video-container">
                    <iframe width="100%" height="541" src={state.lesson.link}                        title="I Made Celeste but it's 3D" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
        {/* <div>
            <Link to={"/quizzes/"+state.lesson.quiz.id} >Quiz: {state.lesson.quiz.quizName} </Link>
            <p>Quiz Progress: {found?found.solvedCount:"Unsolved"}</p>  
        </div> */}
    </div>
);
}

export default Lesson