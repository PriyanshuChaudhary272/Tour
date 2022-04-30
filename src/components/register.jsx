import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useContext } from 'react'
import loginContext from '../Context/Login/Logincontext'
import { Link, useHistory } from "react-router-dom";

// import axios from 'axios';
export default function Register() {
    const history = useHistory();
    const loginContext1 = useContext(loginContext);
    const { userLogin } = loginContext1;
    const [details, setDetails] = useState({ username: "", email: "", password: "" })
    const handleSumbit = async (e) => {
        e.preventDefault();
        // const response = await fetch("https://tour-explore.herokuapp.com/register",
        axios({
            method: 'POST',
            // url: "http://localhost:5000/register",
            url: "https://tour-explore.herokuapp.com/register",
            headers: {
                "Content-Type": 'application/json'
            },
            data: details,
        }).then((json) => {
            if (json.data.success === true) {
                console.log(json)
                localStorage.setItem('token', json.data.authtoken);
                localStorage.setItem('userid', json.data.userid);
                userLogin();
                history.push('/campgrounds')
            }
            else if (json.success === false) {
                alert(json.error)
            }
            console.log(json)
        })
    }
    const onchange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    return (
        <div className="row mt-auto m-0">
            <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <div className="card shadow">
                    <div className="container px-0 pb-3">
                        <img className="card-img-top" src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1838&q=80" alt="" />
                        <h5 className="text-center">Register</h5>
                        <div className="col-6 offset-3">
                            <form className="needs-validation" onSubmit={handleSumbit}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <input className="form-control" type="text" onChange={onchange} name="username" min="5" id="username" required onFocus />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input className="form-control" type="email" onChange={onchange} name="email" id="email" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input className="form-control" type="password" onChange={onchange} name="password" min="3" id="password" required />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-success mb-4">Register</button>
                                </div>
                            </form>
                            <Link className="btn btn-secondary mb-4 " to="/logins">Login</Link>
                            <Link className="btn btn-secondary mb-4 ms-1" to="/campgrounds">Go Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

