import React from "react";
import { Link } from "react-router-dom";
import './home.css'

function Home() {
    return (
        <div className="mt-5 pt-5 home d-flex flex-column justify-content-center">
            <div className="row d-flex">
                <div className="col-md-6 col-8 offset-md-3 offset-2 d-flex flex-column align-items-center">
                    <h2 className='homeh2'>
                        Welcome To Tour!
                    </h2>
                    <p className='homeh2 text-center'>Join the community of travellers! <br />
                        explore the world with us.
                    </p>
                    <Link href="/campgrounds" className="btn btn-secondary">Explore More!</Link>
                </div>
            </div>
        </div>
    )
}
export default Home;