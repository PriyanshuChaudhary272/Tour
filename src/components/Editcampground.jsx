import React, { userRef, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

function Editcampground() {
    const history = useHistory();
    const [camp, setCamp] = useState({});
    const [img, setImg] = useState([])
    const { id } = useParams();
    // const { id } = match.params;
    const [aunthenticated, setAuthenticate] = useState(false);
    const [added, setAdded] = useState(false);
    const [details, setDetails] = useState({ title: "", location: "", description: "", price: "" });
    const onchange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        async function authuser() {
            const res = await axios.get(`https://tour-explore.herokuapp.com/campground/${id}`);
            setCamp(res.data);
            setDetails(res.data)
            console.log(res.data)
        }
        authuser();
        // eslint-disable-next-line 
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // const image = document.querySelector('input[type="file"][multiple]');
        // const details = document.querySelectorAll('input[type="text"]');
        // for(let i = 0; i < details.length; i++){
        //     formData.append(`${details[i].__reactProps$48hoo19a7xi.name}`, details[i].value);
        // }
        // for (let i = 0; i < image.files.length; i++) {
        //     formData.append(`image`, image.files[i]);
        // }
        axios({
            method: 'POST',
            // url: `http://localhost:5000/campground/${id}?_method=PUT`,
            url: `https://tour-explore.herokuapp.com/campground/${id}?_method=PUT`,
            headers: {
                "Content-Type": 'application/json',
                "auth-token": `${localStorage.getItem('token')}`,
                "userid": localStorage.getItem('userid'),
            },
            data: details,
        })
            .then((data) => {
                if (data.data.error) {
                    setAuthenticate(true);
                    setAdded(false);
                }
                else {
                    setAuthenticate(false);
                    setAdded(true);
                }
            })
    }
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center">Edit Location</h1>
            {aunthenticated && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>Please Authenticate
                <Link className="btn btn-warning ms-3 pt-0 pb-0" to="/logins">Login</Link></p>}
            {added && <p style={{ color: 'Green', fontWeight: 'bold', textAlign: 'center' }}>Location Added on Global Map</p>}
            <div className="col-md-6 offset-md-3">
                <form onSubmit={handleSubmit} className="needs-validation" encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control" onChange = {onchange} type="text" name="title" id="title" defaultValue={camp.title} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input className="form-control" onChange = {onchange} type="text" name="location" id="location" defaultValue={camp.location} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" onChange = {onchange} type="text" name="description" id="description" defaultValue={camp.description} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="price">₹</span>
                            <input className="form-control text-muted" onChange = {onchange} type="text" name="price" id="price" defaultValue={camp.price} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="image">Image</label> */}
                        {/* <input className="form-control" onChange = {onchange} type="file" name="image" id="image" multiple /> */}
                    </div>
                    {img.map((e, i) =>
                        <div key={`image-${i}`} className="mb-3 d-inline-block">
                            <img src={e.url.replace("/upload", "/upload/w_150")} alt="" className="mb-2 img-thumbnail" />
                            <label htmlFor={`image-${i}`}>Delete</label>
                            <input type="checkbox" id={`image-${i}`} name="deleteImage[]" value={e.filename} />
                        </div>
                    )}
                    <div className='d-flex justify-content-between'>
                        <button className="btn btn-info mb-4 d-block">Update Location</button>
                        <Link className="btn btn-secondary mb-4" to="/campgrounds">Go Back</Link>
                    </div>
                </form>
            </div>
        </div>
        // <div className= "container mt-5 pt-5">
        //     <form action={`/campground/${id}?_method=PUT`} method ="post">
        //         <label htmlFor="title">Title</label>
        //         <input type="text" name= "title" id="title" defaultValue = {camp[1]}/>
        //         <label htmlFor="location">Location</label>
        //         <input type="text" id ="location" name ="location" defaultValue = {camp[2]}/>
        //         <button>Submit</button>
        //     </form>
        //     <a href="/campgrounds">All campgrounds</a>
        // </div>
    )
}
export default Editcampground;