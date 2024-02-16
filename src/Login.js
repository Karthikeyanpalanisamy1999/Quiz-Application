import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [arr1, setArr1] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(response => setArr1(response.data))
            .catch(err => console.log(err))
    }, []);

    const n = arr1.find((x) => (x.user === user));

    const check = (e) => {
        e.preventDefault();
        if (n) {
            if (n.password === password) {
                alert("Login Successfully");
                window.location.href = '/quiz';
                localStorage.setItem('quizlog', JSON.stringify(user));
                localStorage.setItem('quizpass', JSON.stringify(password));
                localStorage.setItem('validate',JSON.stringify('true'))
            } else {
                alert("Invalid Password");
            }
        } else {
            alert("User Not Found");
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white justify-content-center align-items-center">
                <form onSubmit={check}>
                    <div className="d-flex m-3 justify-content-center align-items-center ">
                        <h1>Login</h1>
                    </div>
                    <div className="m-3">
                        <label className="mt-3">UserId</label>
                        <input type="text" className="form-control" onChange={(e) => setUser(e.target.value)} value={user} placeholder="Enter userId..." />
                    </div>
                    <div className="m-3">
                        <label className="mt-3">Password</label>
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
                    <button type="submit" className="btn btn-success m-3">Login</button>
                    <div className="m-2">
                        <Link to='/signup'>Create New Account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;
