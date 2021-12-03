import { useHistory } from "react-router-dom";
import axios from "axios";
import {React, useEffect} from 'react'
export default function Newcampground() {
    const history = useHistory();
    useEffect(() => {
    axios.get('/isLoggIn').then(res =>{
        if(!res.data){
            history.push('/logins');
        }
    })
    }, [])
    
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center">Add Location</h1>
            <div className="col-md-6 offset-md-3">
                <form action="/campground" method="post" className="needs-validation" encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control" type="text" name="title" id="title" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input className="form-control" type="text" name="location" id="location" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="image">Image</label>
                        <input className="form-control" type="file" name="image" id="image" multiple/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" type="text" name="description" id="description" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="price">$</span>
                            <input className="form-control text-muted" type="text" name="price" id="price" placeholder="0.00" required />
                        </div>
                    </div>
                    <button className="btn btn-success">Add Location</button>
                </form>
                <a  className="btn btn-secondary mt-4" href="/campgrounds">Go Back</a>
            </div>
        </div>
    )

}