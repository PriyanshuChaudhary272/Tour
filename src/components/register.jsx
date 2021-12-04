// import React, { useState, useEffect} from 'react'

import { Link } from "react-router-dom";

// import axios from 'axios';
export default function Register() {

    // const [camps, setCamps] = useState([]);
    // useEffect(() => {
    //     axios.get('/fakeuser').then(res => {
    //         setCamps(res.data)
    //     })
    // }, [])
    return (
        <div className="row mt-auto">
            <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <div className="card shadow">
                    <div className="container px-0 pb-3">
                    <img className="card-img-top" src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1838&q=80" alt="" />
                        <h5 className="text-center">Register</h5>
                        <div className="col-6 offset-3">
                            <form action="https://tour-explore.herokuapp.com/register" method="post" className="needs-validation">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <input className="form-control" type="text" name="username" id="username" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input className="form-control" type="email" name="email" id="email" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input className="form-control" type="password" name="password" id="password" required />
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

