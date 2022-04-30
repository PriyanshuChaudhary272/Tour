import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState} from 'react'
export default function Newcampground() {
    const history = useHistory();
    const [aunthenticated, setAuthenticate] = useState(false);
    const [added, setAdded] = useState(false);
    const [details, setDetails] = useState({title: "", location: "", description: "", price: "", userid : localStorage.getItem('userid')});
    const onchange = (e) =>{
        setDetails({...details, [e.target.name]: e.target.value})
    }
    // useEffect(() => {
    // axios.get('https://tour-explore.herokuapp.com/isLoggIn').then(res =>{
    //     if(!res.data.success){
    //         history.push('/logins');
    //     }
    //     console.log(res)onChange = {onchange}  
    // })
    // // eslint-disable-next-line 
    // }, [])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        const image = document.querySelector('input[type="file"][multiple]');
        // const details = document.querySelectorAll('input[type="text"]');
        // for(let i = 0; i < details.length; i++){
        //     formData.append(`${details[i].__reactProps$48hoo19a7xi.name}`, details[i].value);
        // }
        for (let i = 0; i < image.files.length; i++) {
            formData.append(`image`, image.files[i]);
        }
        axios({
            method: 'POST',
            // url: 'http://localhost:5000/campground',
            url: 'https://tour-explore.herokuapp.com/campground',
            headers: {
                "Content-Type": 'application/json',
                "auth-token": `${localStorage.getItem('token')}`
            },
            data: details,
        })
        .then((data) =>{
            if(data.data.error)
            {
                setAuthenticate(true);
                setAdded(false);
            }
            else
            {
                setAuthenticate(false);
                setAdded(true);
            }
        })
    }
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center">Add Location</h1>
            {aunthenticated && <p style={{color: 'red',fontWeight:'bold', textAlign: 'center'}}>Please Authenticate  
                                        <Link className="btn btn-warning ms-3 pt-0 pb-0" to="/logins">Login</Link></p>}
            {added && <p style={{color: 'Green', fontWeight:'bold', textAlign: 'center'}}>Location Added on Global Map</p>}
            <div className="col-md-6 offset-md-3">
                <form className="needs-validation" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control" onChange = {onchange}  type="text" name="title" id="title" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input className="form-control" onChange = {onchange}  type="text" name="location" id="location" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="image">Image</label>
                        <input className="form-control" type="file" name="image" id="image" multiple />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" onChange = {onchange}  type="text" name="description" id="description" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="price">$</span>
                            <input className="form-control text-muted" onChange = {onchange} type="text" name="price" id="price" placeholder="0.00" required />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button className="btn btn-success mb-4 d-block">Add Location</button>
                        <Link className="btn btn-secondary mb-4" to="/campgrounds">Go Back</Link>
                    </div>
                    {/* <button className="btn btn-success">Add Location</button> */}
                </form>
                {/* <Link className="btn btn-secondary mt-4" to="/campgrounds">Go Back</Link> */}
            </div>
        </div>
    )

}