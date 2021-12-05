import React, { useState} from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";

// import axios from 'axios';
export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const login=(e)=>{
        axios({
            method: "post",
            data:{
                usernmae: user,
                password: password
            },
            withCredentials: true,
            url: "https://tour-explore.herokuapp.com/login"
        })
    }

    return (
        <div className="row mt-auto">
            <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <div className="card shadow">
                    <div className="container px-0 pb-2">
                        <img className="card-img-top" src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1838&q=80" alt="" />
                        <h5 className="text-center">Login</h5>
                        <div className="col-6 offset-3">
                            <form className="needs-validation">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <input className="form-control" onChange={(e)=> setUser(e.target.value)} type="text" name="username" id="username" autoFocus required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input className="form-control" onChange={(e)=> setPassword(e.target.value)}  type="password" name="password" id="password" required />
                                </div>
                                <div className="d-grid gap-2">
                                <button className="btn btn-success mb-4" onClick={login} >Login</button>
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

