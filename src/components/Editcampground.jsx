import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function Editcampground() {
    const history = useHistory();
    const [camp, setCamp] = useState({});
    const [img, setImg] = useState([])
    const { id } = useParams();
    useEffect(() => {
        axios.get('https://tour-explore.herokuapp.com/isLoggIn').then(res => {
            if (!res.data) {
                return history.push('/logins');
            }
            else {//in this way we are handling the cleanup of Effect hook
                axios.get(`https://tour-explore.herokuapp.com/campground/${id}`)
                    .then(res => {
                        setCamp(Object.values(res.data));
                        setImg(res.data.images);
                        console.log(Object.values(res.data));
                    })
            }
        }
        )
    }, [])
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center">Edit Location</h1>
            <div className="col-md-6 offset-md-3">
                <form action={`https://tour-explore.herokuapp.com/campground/${id}?_method=PUT`} method="post" className="needs-validation" encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control" type="text" name="title" id="title" defaultValue={camp[2]} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input className="form-control" type="text" name="location" id="location" defaultValue={camp[3]} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" type="text" name="description" id="description" defaultValue={camp[5]} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="price">$</span>
                            <input className="form-control text-muted" type="text" name="price" id="price" defaultValue={camp[6]} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="image">Image</label>
                        <input className="form-control" type="file" name="image" id="image" multiple />
                    </div>
                    {img.map((e, i) =>
                        <div key={`image-${i}`} className="mb-3 d-inline-block">
                            <img src={e.url.replace("/upload","/upload/w_150")} alt="" className="mb-2 img-thumbnail" />
                            <label htmlFor={`image-${i}`}>Delete</label>
                            <input type="checkbox" id={`image-${i}`} name="deleteImage[]" value={e.filename} />
                        </div>
                    )}

                    <button className="btn btn-info mb-4 d-block">Update Location</button>
                <a  className="btn btn-secondary mb-4" href="/campgrounds">Go Back</a>
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