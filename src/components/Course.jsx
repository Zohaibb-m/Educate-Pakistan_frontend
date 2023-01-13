import React, {useState,useEffect} from "react";
import Axios from 'axios'
import {BrowserRouter as Router, Route, Link,  useNavigate, useParams } from 'react-router-dom'
import Login_Context from "../Context/Login_Context";
import { useContext } from "react";
import User_Context from "../Context/User_Context";
import axios from "axios";

function Course(props){
    let {courseID}=useParams()
    let [state,setState]=useState({
        course:false
    })
    let [progresses,setprogresses]=useState([])
    let [msg,setmsg]=useState("")
    const {isLogin}=useContext(Login_Context)
    let [loading,setLoading]=useState(true)
    const {User,setUser}=useContext(User_Context)
    useEffect(()=>{async function getData(){
        await Axios.get("https://educate-pakistan-server.herokuapp.com/courses/"+courseID)
            .then((response)=>{
                setState({
                    course:response.data
                })
            })
            
        }
        getData()
        }, [])
        useEffect(()=>{async function getProgresses(){
            let progresses=[];
            for(let i=0;i<User.progresses.length;i++){
                   await axios.get("https://educate-pakistan-server.herokuapp.com/progresses/"+User.progresses[i])
                    .then(res=>{
                        progresses.push(res.data)
                    })
            }
                setprogresses(progresses)
                setLoading(false)
                
            }
            getProgresses()
            }, [User])
let found=undefined
if(isLogin){
    found=User.courses.find(id=> id===state.course.id)
}


    function renderLessons(){
        // let i=0
        // console.log(progresses)
        // return state.course.lessons.map((lesson,index)=>(
        //     <div>
        //     <a href={"/lessons/"+lesson.id}>{lesson.title}</a>
        //     <p>Progress: {(progresses[i].lessonID===lesson.id)?console.log(progresses[i],"progressa"):console.log(progresses[i],"progress")}/{lesson.points}{console.log(progresses[i])}</p>
        //     <p>{lesson.description}</p>
        //     </div>
        // ))
        let lessons=state.course.lessons
        let lessonsR=[] 
        for(let i=0;i<state.course.lessons.length;i++){
            let progress=progresses.find(progress=>(progress.lessonID===lessons[i].id))
            lessonsR.push(<div>
                     <a href={"/lessons/"+lessons[i].id}>{lessons[i].title}</a>
                     <p>Progress: {(progress===undefined)?0:progress.points}/{lessons[i].points}{console.log(progresses[i])}</p>
                     <p>{lessons[i].description}</p>
                     </div>)
        }
        console.log(lessonsR)
        return (
            <div>
                {lessonsR}
            </div>
        )
    }

    async function enrollCourse(){
        if(isLogin){
                let points=0;
                for(let i=0;i<state.course.lessons.length;i++){
                    points+=state.course.lessons[i].points
                }
                console.log(points,state.course.lessons.length)
                User.courses.push(state.course)
                await axios.post("https://educate-pakistan-server.herokuapp.com/course-progresses",{
                    points:points,
                    courseID:state.course.id,
                    progresses:[]
                }).then(res=>{
                    console.log("progress_o",res.data)
                    User.course_progresses.push(res.data)
                })
                await axios.put("https://educate-pakistan-server.herokuapp.com/users/"+User.id,{
                    courses:User.courses,
                    course_progresses:User.course_progresses    
                })
                .then(()=>{
                    setmsg("Successfully added Course")
                    setUser(User)
                    found=state.course
                    window.location.reload(false)
                }
                )
                .catch(err=>{
                    setmsg("An error Occured")})
            }
        else{
            setmsg("Please Login to enroll")
        }
    }

    if(!state.course)return(
        <div>
            Loading...
            <h3 className="enrollLogin"></h3>
        </div>
    )
    else 
        return (
            <div>
                <img src={require("../images/"+String(state.course.courseImage))} />
                <h1>Course Name: {state.course.courseName}</h1>
                {found===undefined?<div><button onClick={() => enrollCourse()}>Enroll</button><h3 className="enrollLogin">{msg}</h3></div>:<h3>You have already enrolled</h3>}
                <p>Description: {state.course.courseDescription} </p>
                {(loading)?<p>loading</p>:renderLessons()}
            </div>
    );
}

export default Course;