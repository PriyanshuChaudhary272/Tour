import { React, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react'
import loginContext from '.././Context/Login/Logincontext';
import "./common.css"

export default function Navbar() {
    const history = useHistory();
    const loginContext1 = useContext(loginContext);
    const { loginStatus, userLogin, userLogout } = loginContext1;
    const [islogin, setislogin] = useState(false)
    useEffect(() => {
        if(localStorage.getItem('token')){
            setislogin(true)
            userLogin();
        }
    },[localStorage.getItem('token')])
    const handleClick = () =>{
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            userLogout();
        }
        setislogin(false);
        history.push('/campgrounds');
    }
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Tour</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/campgrounds">Explore</Link>
                            <Link className="nav-link" to="/campgrounds/add">Add Location</Link>
                        </div>
                        <div className="navbar-nav ms-auto">
                            {
                                (loginStatus)?
                                        <button className="btn btn-warning" onClick = {handleClick}>Logout</button>
                                    :
                                    <>
                                        <Link className="nav-link" to="/logins">Login</Link>
                                        <Link className="nav-link" to="/registers">Register</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
