import React, { useState } from "react";
import axios from "axios";
function AddQuestions() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAns, setCorrectAns] = useState("");
    const [arr1,setArr1] = useState([{}])
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const Store=(e)=>{
      e.preventDefault();
      axios.post('http://localhost:3001/addquestion',{question,options,correctAns})
      .then(response=>setArr1([...arr1,response.data]))
      .catch(err=>console.log(err))
      window.location.href='/quiz';
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white justify-content-center align-items-center">
                <form onSubmit={Store}>
                    <div className="d-flex m-3 justify-content-center align-items-center">
                        <h1>Add Questions</h1>
                    </div>
                    <div className="m-2">
                        <label className="mt-3">Question</label>
                        <input
                            type="text"
                            className="form-control mt-2"
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                            placeholder="Enter Question"
                            required
                        />
                    </div>
                    <div className="m-2">
                        <label className="mt-3">Options</label>
                        {options.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control mt-2"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                required
                            />
                        ))}
                    </div>
                    <div className="m-2">
                        <label className="mt-3">Correct Answer</label>
                        <select
                            className="form-control mt-2"
                            value={correctAns}
                            onChange={(e) => setCorrectAns(e.target.value)}
                            required
                        >
                            <option value="">Select Correct Answer</option>
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success m-3">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddQuestions;
