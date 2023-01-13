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
if(!state.lesson)return(
    <div>
        Loading...
    </div>
)
else 
    return (
        <div>
            <iframe width="560" height="315" src={state.lesson.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h1>Lesson Name: {state.lesson.title}</h1>
            <p>Description: {state.lesson.description} </p>
            <Link to={"/quizzes/"+state.lesson.quiz.id} >Quiz: {state.lesson.quiz.quizName} </Link>
            <p>Quiz Progress: {found?found.solvedCount:"Unsolved"}</p>
            
        </div>
);
}

export default Lesson