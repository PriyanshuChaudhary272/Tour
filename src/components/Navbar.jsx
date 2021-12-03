import { React, useEffect, useState } from 'react'
import "./common.css"
const axios = require('axios')

export default function Navbar() {
    const nav = document.querySelectorAll('.nav-link');
    for(var i of nav){
        i.addEventListener('click',function(){
            // i.classList.add('active')
            console.log(i)
        })
    }
    const [islogin, setislogin] = useState(false)
    useEffect(() => {
        axios.get('https://tour-explore.herokuapp.com/isLoggIn').then(res => {
            if (res) {
                setislogin(res.data)
            }
        })
    },[])
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Tour</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                            <a className="nav-link" href="/campgrounds">Explore</a>
                            <a className="nav-link" href="/campgrounds/add">Add Location</a>
                        </div>
                        <div className="navbar-nav ms-auto">
                            {
                                (islogin !== false)?
                                    <form action="/logout?_method=GET" method="post">
                                        <button className="btn btn-warning">Logout</button>
                                    </form> :
                                    <>
                                        <a className="nav-link" href="/logins">Login</a>
                                        <a className="nav-link" href="/registers">Register</a>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
