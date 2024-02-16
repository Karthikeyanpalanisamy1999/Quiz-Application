import React, { useState } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";
function Signup() {
    const  [user,setUser] = useState('');
    const  [mobile,setMobile] = useState('');
    const  [password,setPassword] = useState('');
    const   [confirmpassword,setConfirmpassword] = useState('');
    const [showPassword,setShowPassword] = useState(false);
    const [showPassword1,setShowPassword1] = useState(false);
    const  [arr1,setArr1] = useState([{

    }])

    const Cheack=(e)=>{
        let l=password.length;
        e.preventDefault();
        if(l>=8)
        {
            if(password==confirmpassword)
            {
                axios.post('http://localhost:3001/signup',{user,mobile,password,confirmpassword})
                .then(response=>setArr1([...arr1,response.data]))
                .catch(err=>console.log(err))
                alert("Registered Successfully");
                window.location.href='/';
            }
            else
            {
                alert("Password Not Match");
            }
        }
        else
        {
            alert("Password Must Contain 8 letters")
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleeShowPassword = () => {
        setShowPassword1(!showPassword1);
    }
  return (
   
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center ">
      <div className="w-50 bg-white justify-content-center align-items-center">
            <form onSubmit={Cheack}>
                 <div className="d-flex m-3 justify-content-center align-items-center ">
                    <h1>Signup</h1>
                 </div>
                <div className="m-2">
                    <label className="mt-3">UserId<span className="text-danger">*</span></label>
                    <input type="text" className="form-control"
                    onChange={(e)=>setUser(e.target.value)}
                     required value={user} placeholder="Enter userId...">
                    </input>
                </div>
                <div className="m-2">
                    <label className="mt-3">Mobile<span className="text-danger">*</span></label>
                    <input type="text" className="form-control"
                    required value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Mobile No...">
                    </input>
                </div>
                <div className="m-3">
                        <label className="mt-3">Password<span className="text-danger">*</span></label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="form-control"
                                placeholder="Enter password..."
                            />
                            <button type="button" className="" onClick={toggleShowPassword}>
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>
                    <div className="m-3">
                        <label className="mt-3">ConfirmPassword<span className="text-danger">*</span></label>
                        <div className="input-group">
                            <input
                                type={showPassword1 ? "text" : "password"}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                value={confirmpassword}
                                className="form-control"
                                placeholder="Enter password..."
                            />
                            <button type="button" className="" onClick={toggleeShowPassword}>
                                {showPassword1 ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>
                <button className="btn btn-success m-3">Signup</button>
                <div className="m-2">
                    <Link to='/'>Already Have an Account</Link>
                </div>
            </form>   
      </div>
      </div>
  )
};

export default Signup;
