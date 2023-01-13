import React, {useState,useEffect} from "react";
import Axios from 'axios'
import {BrowserRouter as Router, Route, Link,  useNavigate } from 'react-router-dom'

function Courses({setLogin}){
    let [state,setState]=useState({
        subjects:[],
        posts:[]
        })

    

    useEffect(()=>{
        async function getSubjects(){
            await Axios.post("/data/getData")
                .then((response)=>{
                    setState({subjects:response.data})
                    // console.log(state.posts)
                })
        }
        getSubjects() 
    }, [])
    

    let returnCourses = () =>{
        // console.log("Here")
        // console.log(state.posts)
        console.log(state.subjects);
        // return state.posts.map((course, index)=>(
        //     <div key={index}>
        //         <div>{course.courseID}</div>
        //     </div>
        // )) 
    }
    return (
            <div>
                {returnCourses()}
            </div>
    );
}

export default Courses;