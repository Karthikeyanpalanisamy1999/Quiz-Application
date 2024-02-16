import React, { useEffect, useState } from "react";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle.js";
import { Link } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [questions, setQuestions] = useState([]);
  const [array,setArray] = useState([{

  }])

 let s = JSON.parse(localStorage.getItem('quizlog')) || [];
 let p = JSON.parse(localStorage.getItem('quizpass')) || [];
 let validate =JSON.parse(localStorage.getItem('validate')) || [] ;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/quiz')
      .then(response => setQuestions(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = () => {
    const nextQuestion = currentQuestion + 1;
    if (selected === questions[currentQuestion].correctAns) {
      setScore(score + 1);
    }
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelected(null);
    } else {
      setShowScore(true);
    }
  };

  let f = currentDateTime.toLocaleString();
  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelected(null);
     axios.post('http://localhost:3001/quiz',{s,score,f})
    .then(response=>setArray([...array,response.data]))
    .catch(err=>console.log(err))
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/quiz/${id}`)
      .then(() => {
        const updatedQuestions = questions.filter(q => q._id !== id);
        setQuestions(updatedQuestions);
        setCurrentQuestion(0); 
      })
      .catch(err => console.log(err));
  };

  const Logout=()=>{
    localStorage.setItem("validate",JSON.stringify("false")) ;
    window.location.href ='/';
  }

  return (
    <div>
    {
       s == "Karthikeyan" && p=="Karthik@2024"  ? (  <div className="container-fluid quizcolor vh-100">
       <p className="pt-2">Date & Time: {currentDateTime.toLocaleString()}</p>
       <Link to='/scorelist'>Scorelist</Link>
       <div className="d-flex justify-content-end align-items-center mb-3">
         <h3 className="me-3">
           <FaUserCircle />
           <span className="ms-2">{s}</span>
         </h3>
         <Link to='/addquestion' className="btn btn-success ms-3 me-2">Add More Questions</Link>
         <button className="btn btn-warning me-2" onClick={() => handleDelete(questions[currentQuestion]._id)}>Delete This Question</button>
         <button className="btn btn-danger me-2" onClick={Logout}>Logout</button>
       </div>
       <h1 className="text-center mb-4">Quiz</h1>
       <h5 className="me-3">Total Questions: {questions.length}</h5>
       {showScore ? (
         <div className="text-center mt-4">
           <p>Score: {score}</p>
           <button className="btn btn-primary" onClick={handleRestart}>Restart</button>
         </div>
       ) : (
         questions.length > 0 && (
           <div className="bor">
             <h4 className="text-center">{currentQuestion + 1}.{questions[currentQuestion].question}</h4>
             <form className="ms-5">
               {questions[currentQuestion].options.map((option, optionIndex) => (
                 <div key={optionIndex} className="ms-5 ">
                   <label>
                     <input
                       type="radio"
                       value={option}
                       checked={selected === option}
                       onChange={() => setSelected(option)}
                     />
                     {option}
                   </label>
                 </div>
               ))}
             </form>
 
             {
               questions.length-1 == currentQuestion ? (  <div className="text-center mt-4">
               <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
             </div>):( <div className="text-center mt-4">
               <button className="btn btn-primary" onClick={handleSubmit}>Next</button>
             </div>)
             }
           
           </div>
         )
       )}
     </div>):(<div className="container-fluid quizcolor vh-100">
       <p className="pt-2">Date & Time: {currentDateTime.toLocaleString()}</p>
       <Link to='/scorelist'>Scorelist</Link>
       {
          validate == 'true' ? ( <div className="d-flex justify-content-end align-items-center mb-3">
          <h3 className="me-3">
            <FaUserCircle />
            <span className="ms-2">{s}</span>
          </h3>
          <button className="btn btn-danger me-2" onClick={Logout}>Logout</button>
        </div>) : (<></>)
       }
       <h1 className="text-center mb-4">Quiz</h1>
       <h5 className="me-3">Total Questions: {questions.length}</h5>
       {showScore ? (
         <div className="text-center mt-4">
           <p>Score: {score}</p>
           <button className="btn btn-primary" onClick={handleRestart}>Restart</button>
         </div>
       ) : (
         questions.length > 0 && (
           <div className="bor">
             <h4 className="text-center">{currentQuestion + 1}.{questions[currentQuestion].question}</h4>
             <form className="ms-5">
               {questions[currentQuestion].options.map((option, optionIndex) => (
                 <div key={optionIndex} className="ms-5 ">
                   <label>
                     <input
                       type="radio"
                       value={option}
                       checked={selected === option}
                       onChange={() => setSelected(option)}
                     />
                     {option}
                   </label>
                 </div>
               ))}
             </form>
 
             {
               questions.length-1 == currentQuestion ? (  <div className="text-center mt-4">
               <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
             </div>):( <div className="text-center mt-4">
               <button className="btn btn-primary" onClick={handleSubmit}>Next</button>
             </div>)
             }
           
           </div>
         )
       )}
     </div>)
    }
  
    </div>
  );
};

export default Quiz;