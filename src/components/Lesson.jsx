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
    useEffect(()=>{
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
    }
    },[])
        setChecked(true)
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
        useEffect(()=>{
            function onVideoClick(){
                document.querySelector(".content-container").innerHTML=`
                <div class="video-heading-container">
                <h3 class="video-heading">Video Lesson</h3>
                </div>
                <div class="video-container">
                <iframe width="100%" height="541" src=${state.lesson.link} title="I Made Celeste but it's 3D" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
                </div>
                `
            }
            
            function onQuizClick(){
                document.querySelector(".content-container").innerHTML=`
                <h1>Quiz</h1>`;
            } 

            function addEvents(){
                document.getElementById("quiz-btn").addEventListener("click",onQuizClick)
                document.getElementById("video-btn").addEventListener("click",onVideoClick)
            }

            if(state.lesson)addEvents();
        },[state.lesson])
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
                            <p className="lesson-name"><span className="color-blue">Lesson </span><br />{state.lesson.title}</p>
                        </div>
                        <ul className="lesson-resources">
                            <li className="lesson-resource-item active">
                                <a id="video-btn" href={"/lessons/${}"+state.lesson.lessonID} >
                                    <span>
                                        <div className="item">
                                            Lesson Video
                                        </div>
                                    </span>
                                </a>
                            </li>
                            <li className="lesson-resource-item">
                                <a id="quiz-btn" href={"/quizzes/"+state.lesson.quiz.id} >
                                    <span>
                                        <div className="item">
                                        {state.lesson.quiz.quizName}
                                        <p>      </p>
                                        {found?<progress value={found.solvedCount} max="5"></progress>:<p>Un Attempted</p>}
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
                <div class="video-heading-container">
                <h3 class="video-heading">Video Lesson</h3>
                </div>
                <div class="video-container">
                <iframe width="100%" height="541" src={state.lesson.link} title="I Made Celeste but it's 3D" frameborder="0"
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