import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Error({ match }) {
    const [m, setM] = useState('Page not found');
    const [s, setS] = useState('404');

    useEffect(() => {
        //before this we check if there is some message and status in path or not
        if (match) {
            const {message = 'Page not found', status = '404'} = match.params;
            setM(message); setS(status);
        }
        // eslint-disable-next-line 
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="alert alert-danger mt-5 pt-5" role="alert">
                        <h4 className="alert-heading">{m}</h4>
                        <h2>{s}!!!</h2>
                        <hr />
                        {/* <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p> */}
                    </div>
                    <div className="text-center">
                        <Link to="/campgrounds" className='mt-3 btn btn-warning' role='button'>Go back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}