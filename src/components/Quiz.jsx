import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext} from 'react'
import User_Context from "../Context/User_Context";
import Axios from 'axios'

function Quiz() {
    const {User}=useContext(User_Context)
    const {quizID}=useParams()
    let [state,setState]=useState({
        quiz:false
    })
    let[Loading,setLoading]=useState(true)
    let [answer,setAnswer]=useState(false)
    let [question,setQuestion]=useState(false)
    let [options,setOptions]=useState(false)
    let [count,setCount]=useState(0)
    let [score,setScore]=useState(0)
    const navigate=useNavigate()
    let total=0
    useEffect(()=>{
        async function getData(){
            await Axios.get("https://educate-pakistan-server.herokuapp.com/quizzes/"+quizID)
            .then((response)=>{
                setState({
                    quiz:response.data
                })
                
            })
            .catch(err=>{
                console.log(err,"error")
            }
            )
        }
        getData()   
    }
    , [])

    useEffect(()=>{
        if(state.quiz){
                setLoading(false)
                setAnswer(state.quiz.questions[count].Answer)
                setQuestion(state.quiz.questions[count].Statement)
                setOptions([state.quiz.questions[count].Option1,state.quiz.questions[count].Option2,state.quiz.questions[count].Option3,state.quiz.questions[count].Option4])
                // console.log(answer,question,options)
        }
    }
    , [state.quiz])
    let progress=false
    async function updateQuiz(score){
        let points=Math.ceil(score*(state.quiz.lesson.points/state.quiz.questions.length))
        // console.log("pon",state.quiz.id,score,state.quiz.lesson.id,state.quiz.lesson.points,points)
        await Axios.post("https://educate-pakistan-server.herokuapp.com/progresses",{
            quizID:state.quiz.id,
            solvedCount:score,
            lessonID:state.quiz.lesson.id,
            lessonPoints:state.quiz.lesson.points,
            points:points
        }).then(response=>{
            progress=response.data
            // console.log(response)
        })
        .catch(err=>{
            console.log(err,"progess")
        })
        User.progresses.push(progress)
        await Axios.put("https://educate-pakistan-server.herokuapp.com/users/"+User.id,{
            progresses:User.progresses
        }).then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    if(Loading){
        // console.log(state.quiz)
        return(
            <div>
                Loading...
            </div>
        )
    }
    else{
        total=state.quiz.questions.length
        return(
            <div className="lesson-page-container">
        <div className="lessons-container">
            <div className="lesson-contents-container">
                <div className="content-container">
                <div class="quiz-container">
                        <div class="course-name-container">
                            <p class="course-name">{state.quiz.quizName}</p>
                        </div>
                        <br />
                        <br />
                        <h1 class="course-name quiz-name">Question No {count+1}:</h1>
                        
                        <div id="question-1" class="question">
                          <p class="quiz-question">{question}</p>
                          <div class="options">
                            <input type="radio" class="btn-check" name="userAnswer" id="option1" autocomplete="off"required value={options[0]} />
                            <label class="btn btn-outline-primary quiz-option" for="option1">{options[0]}</label>
                             
                            <input type="radio" class="btn-check" name="userAnswer" id="option2" autocomplete="off"required value={options[1]} />
                            <label class="btn btn-outline-primary quiz-option" for="option2">{options[1]}</label>   
                            
                            <input type="radio" class="btn-check" name="userAnswer" id="option3" autocomplete="off"required value={options[2]} />
                            <label class="btn btn-outline-primary quiz-option" for="option3">{options[2]}</label>   

                            <input type="radio" class="btn-check" name="userAnswer" id="option4" autocomplete="off"required value={options[3]} />
                            <label class="btn btn-outline-primary quiz-option" for="option4">{options[3]}</label>   
                            
                          </div>
                        </div>
                        <button onClick={()=>{
                    let userA=document.querySelector('input[name="userAnswer"]:checked').value
                    // console.log(total,userA,answer,count,score,state.quiz.questions[count])
                    if(userA===answer){
                        score=score+1
                        setScore(score)
                    }
                    
                    // console.log(total,userA,answer,count,score,state.quiz.questions[count])
                    count=count+1
                    if(count<total){
                        setCount(count)
                        setAnswer(state.quiz.questions[count].Answer)
                        setQuestion(state.quiz.questions[count].Statement)
                        setOptions([state.quiz.questions[count].Option1,state.quiz.questions[count].Option2,state.quiz.questions[count].Option3,state.quiz.questions[count].Option4])
                        console.log(state.quiz)
                    }
                    else{
                        updateQuiz(score)
                        setTimeout(()=>{
                            navigate("/lessons/"+state.quiz.lesson.id)
                        },2000)
                    }
                }
                } class="btn btn-outline-dark next-button">Next</button>
                      </div>
                      
                </div>
            </div>
        </div>
    </div>
            
        )
    }
}    

export default Quiz

{/* <div>
                <h1></h1>
                <h3></h3>
                <div className="custom-control custom-radio" >
			      		<input type="radio" className="custom-control-input" name="userAnswer"  required value={options[0]}/>
						<label className="custom-control-label" htmlFor="userAnswer"> {options[0]}</label>							
						<br />
                        <input type="radio" className="custom-control-input" name="userAnswer"  required value={options[1]}/>
						<label className="custom-control-label" htmlFor="userAnswer"> {options[1]}</label>							
						<br />
                        <input type="radio" className="custom-control-input" name="userAnswer"  required value={options[2]}/>
						<label className="custom-control-label" htmlFor="userAnswer"> {options[2]}</label>
                        <br />
                        <input type="radio" className="custom-control-input" name="userAnswer"  required value={options[3]}/>
						<label className="custom-control-label" htmlFor="userAnswer"> {options[3]}</label>
				</div>
                <button onClick={()=>{
                    let userA=document.querySelector('input[name="userAnswer"]:checked').value
                    console.log(total,userA,answer,count,score,state.quiz.questions[count])
                    if(userA===answer){
                        score=score+1
                        setScore(score)
                    }
                    count=count+1
                    setCount(count)
                    console.log(total,userA,answer,count,score,state.quiz.questions[count])
                    if(count<total){
                        setAnswer(state.quiz.questions[count].Answer)
                        setQuestion(state.quiz.questions[count].Statement)
                        setOptions([state.quiz.questions[count].Option1,state.quiz.questions[count].Option2,state.quiz.questions[count].Option3,state.quiz.questions[count].Option4])
                    }
                    else{
                        updateQuiz(score)
                        navigate(-1)
                    }
                }
                }>Next</button> */}

