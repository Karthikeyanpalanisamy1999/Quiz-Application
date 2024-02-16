import React from "react"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Scorelist() {
    const [arr1,setArr1] = useState([{

    }]);
    useEffect(()=>{
        axios.get('http://localhost:3001/scorelist')
        .then(response=>setArr1(response.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <div className="d-flex  vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white justify-content-center align-items-center p-3">
      <h2 className="d-flex justify-content-center align-items-center">ScoreList</h2>
           <Link to='/quiz' className='btn btn-warning mt-3 mb-3'>Back to Home</Link>
           <table className="table">
                <thead>
                 <th>S.no</th>
                 <th>Name</th>
                 <th>Score</th>
                 <th>Date & Time</th>    
                </thead> 
                <tbody>
                    {
                        arr1.map((x,index)=>{
                           return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{x.s}</td>
                                <td>{x.score}</td>
                                <td>{x.f}</td>
                            </tr>
                        })
                    }
                </tbody>
           </table> 
      </div>
    </div>
  )
};

export default Scorelist;
