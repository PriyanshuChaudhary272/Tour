import React, { useState} from 'react';
import { useContext } from 'react'
import axios from 'axios';
import loginContext from '../Context/Login/Logincontext'
import { Link, useHistory } from "react-router-dom";

// import axios from 'axios';
export default function Login() {
    const history = useHistory();
    // const login=()=>{
        // if(!user.length || !password.length)
        // {
        //     err.innerHTML = 'Correct username and password are required'
        //     err.style.color = "red"
        // }
        // else{
        //     axios({
        //         method: "POST",
        //         data:{
        //             username: user,
        //             password: password
        //         },
        //         headers: {'X-Requested-With': 'XMLHttpRequest'},
        //         withCredentials: true,
        //         url: "https://tour-explore.herokuapp.com/login"
        //     })
        //     .then(res => {
        //         console.log(res);
        //     })
        // }
    // }
    const loginContext1 = useContext(loginContext);
    const { userLogin } = loginContext1;
    const [details, setDetails] = useState({email: "", password: ""})
    const onChange = (e) =>{
        setDetails({...details, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("https://tour-explore.herokuapp.com/login",
        {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: details.email, password: details.password})
        });
        
        // console.log(user.data.user._id);
        const json = await response.json();
        
        if(json.success === true){
            localStorage.setItem('token', json.authtoken)
            const user = await axios({
                method: 'GET',
                url: 'https://tour-explore.herokuapp.com/isLoggIn',
                headers: {
                    "Content-Type": 'application/json',
                    "auth-token": `${localStorage.getItem('token')}`
                },
            });
            localStorage.setItem('userid', user.data.user._id)
            userLogin();
            history.push('/campgrounds')
        }
        else if(!json.success){
            alert(json.error)
        }
    }
    return (
        <div className="row mt-auto m-0">
            <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <div className="card shadow">
                    <div className="container px-0 pb-2">
                        <img className="card-img-top" src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1838&q=80" alt="" />
                        <h5 className="text-center">Login</h5>
                        <div className="col-6 offset-3">
                            <form className="needs-validation loginform" onSubmit={handleSubmit}>
                                <p className="loginerror"></p>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" type="email" name = "email" onChange= {onChange} id="email" autoFocus required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input className="form-control" type="password" name = "password" onChange= {onChange} min="3" id="password" required />
                                </div>
                                <div className="d-grid gap-2">
                                <button className="btn btn-success mb-4">Login</button>
                                </div>
                            </form>
                            <Link className="align-center btn btn-secondary mb-4 " to="/campgrounds">Go Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

