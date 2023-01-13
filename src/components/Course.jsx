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
            if(User){
            for(let i=0;i<User.progresses.length;i++){
                   await axios.get("https://educate-pakistan-server.herokuapp.com/progresses/"+User.progresses[i])
                    .then(res=>{
                        progresses.push(res.data)
                    })
            }
                setprogresses(progresses)
                setLoading(false)
                
            }else{
             setLoading(false)       
                }
            }
            getProgresses()
            }, [User])
let found=undefined
if(isLogin){
    found=User.courses.find(id=> id===state.course.id)
}


    function renderLessons(){
        let lessons=state.course.lessons
        let lessonsR=[] 
        for(let i=0;i<state.course.lessons.length;i++){
            let progress=progresses.find(progress=>(progress.lessonID===lessons[i].id))
            lessonsR.push(
                <div class="lesson-container">
                <div class="lesson">
                <a class="lesson-name"href={"/lessons/"+lessons[i].id}>{lessons[i].title}</a>
                  <p class="lesson-description">{lessons[i].description}</p>
                {isLogin && progress?<progress class="lesson-progress" value={progress.points} max={lessons[i].points}></progress>:<p>Login to see Progress</p>}
                </div> 
              </div>)
        }
        console.log(lessonsR)
        return (
            <div>
                {lessonsR}
            </div>
        )
    }

    function renderLessonNames(){
        let lessons=state.course.lessons
        let lessonsR=[]
        // lessonsR.push(<React.Fragment><tr><td className="tdd">kdjvbdjvbjvbfkjbvfjkvbdfjbvfkjvbfk</td></tr></React.Fragment>)
        for(let i=0;i<state.course.lessons.length;i++){
            lessonsR.push(
                <React.Fragment>
                    <tr>
                        <td>{lessons[i].title}</td>
                    </tr>
                </React.Fragment>
                    )
        }
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
                <div className="course">
                    <h1 className="lesson-name-heading">{state.course.courseName}</h1>
                    <h4 className="course-name">{state.course.courseDescription}</h4>
                </div>
                <div className="course-title-container">
                <div className="lesson-sidebar">
                <div class="sidebar">
                    <h2 className="lesson-sidebar-heading">Lessons</h2>
                    <table className="table">
                    {(loading)?<p>loading</p>:renderLessonNames()}
                    </table>
                    </div>
                </div>
                <div className="lessons-container">
                    {(loading)?<p>loading</p>:renderLessons()}
                </div>
                </div>
                {found===undefined?<div><button onClick={() => enrollCourse()}>Enroll</button><h3 className="enrollLogin">{msg}</h3></div>:<h3>You have already enrolled</h3>}               
            </div>
                
    );
}

export default Course;