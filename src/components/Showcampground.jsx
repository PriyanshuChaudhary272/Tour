import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios';
import Errorhandler from './Errorhandler'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Link } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFuc2h1MTQ4IiwiYSI6ImNrd25zbHhxNzJwYmcycW5zMHl5OTBrc3AifQ.IIsmFvf_1fN4RZsmEAZ7Ow';
// import { useParams } from 'react-router-dom'// we c an either use this to get params from url orr we can get complete info of route using match object
function Showcampground({ match }) {
    // const [imgurl, setImageurl] = useState("");
    // const {id}  = useParams();
    // const [lng, setLng] = useState(-70.9);
    // const [lat, setLat] = useState(42.35);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
    const [review, setReview] = useState(1)
    const [camp, setCamp] = useState([]);
    const [authorized, setauthorized] = useState(false);
    const [reviewdata, setReviewdata] = useState({ rating: 0, review: "" });
    const [login, setLogin] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const onchange = (e) => {
        setReviewdata({ ...reviewdata, [e.target.name]: e.target.value })
    }
    useEffect(function () {
        const { id } = match.params;
        async function authuser() {
            const res = await axios.get(`https://tour-explore.herokuapp.com/campground/${id}`);
            // const user = await axios({
            //     method: 'GET',
            //     url: 'https://tour-explore.herokuapp.com/isLoggIn',
            //     headers: {
            //         "Content-Type": 'application/json',
            //         "auth-token": `${localStorage.getItem('token')}`
            //     },
            // });
            // setLogin(user.data.user);
            // setauthorized(user.data.user);
            setCamp(res.data);
            if (localStorage.getItem('token')) {
                setLogin(true)
            }

            // console.log(res.data)
            if (res.data.author._id === localStorage.getItem('userid')) {// we should not use camp or authorized because setting them may take some time and accessing will throw error
                setauthorized(true)
            }
            const coordinate = (res.data.geometry.coordinates);
            if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: coordinate,
                zoom: zoom
            });
            map.current.addControl(new mapboxgl.NavigationControl());
            new mapboxgl.Marker()
                .setLngLat(coordinate)
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${res.data.location}</h3><p>${res.data.title}</p>`))
                .addTo(map.current)
        }
        authuser();
        // eslint-disable-next-line 
    }, [review])
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // const image = document.querySelector('input[type="file"][multiple]');
        // // const details = document.querySelectorAll('input[type="text"]');
        // // for(let i = 0; i < details.length; i++){
        // //     formData.append(`${details[i].__reactProps$48hoo19a7xi.name}`, details[i].value);
        // // }
        // for (let i = 0; i < image.files.length; i++) {
        //     formData.append(`image`, image.files[i]);
        // }
        axios({
            method: 'POST',
            // url: `http://localhost:5000/campground/${camp._id}/review`,
            url: `https://tour-explore.herokuapp.com/campground/${camp._id}/review`,
            headers: {
                "Content-Type": 'application/json',
                "auth-token": localStorage.getItem('token'),
                "userid": localStorage.getItem('userid')
            },
            data: reviewdata,
        })
            .then((data) => {
                if (data.data.error) {
                    setReview(true);
                }
                else {
                    var frm = document.getElementsByName("Review-form")[0];
                    frm.reset();
                    setReview(2);
                }
            })
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `http://localhost:5000/campground/${camp._id}?_method=DELETE`,
            // url: `https://tour-explore.herokuapp.com/campground/${camp._id}?_method=DELETE`,
            headers: {
                "Content-Type": 'application/json',
                "auth-token": localStorage.getItem('token'),
                "userid": localStorage.getItem('userid')
            },
        })
            .then((data) => {
                console.log(data);
                if (data.data.success) {
                    setDeleted(true);
                }
                else {
                }
            })
    }
    if (camp.title) {
        return (
            <>
                <div className="d-flex flex-sm-row flex-column row mt-5 mb-5 pt-5 mx-auto container">
                    {deleted && <h5 className='mb-4' style= {{ color: "#BB2D3A", textAlign:"center", fontWeight: "bold"}}>Deleted! Its Time to say 👋 BYE...</h5> }
                    <div className="col-sm-6">
                        <div className="card">
                            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {camp.images.map((e, i) =>
                                        <div key={e.filename} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                            <img key={e.filename} src={e.url} className="card-img-top" alt="" />
                                        </div>
                                    )}
                                </div>
                                {
                                    camp.images.length > 1 ?
                                        <>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon avbar-brand" aria-hidden="true">
                                                    {/* <img src={left} alt="" width="30" height="24"/> */}
                                                </span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </> :
                                        null
                                }
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">{camp.title}</h5>
                                <p className="card-text">{camp.decription}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Location: {camp.location}</li>
                                <li className="list-group-item">Submited by: {camp.author.username}</li>
                                <li className="list-group-item">Price: ₹{camp.price}</li>
                            </ul>
                            {
                                authorized === true ?
                                    <div className="card-body">
                                        <form onSubmit={handleDelete} className="d-inline">
                                           {deleted === false &&  <button className="btn btn-danger me-1 ">Delete</button>}
                                        </form>
                                        {deleted === false && <Link className="btn btn-info ms-1 " to={`/campgrounds/${camp._id}/edit`} >Edit</Link>}
                                    </div> :
                                    null
                            }

                            <div className="card-footer">
                                <small className="text-muted">3 days ago</small>
                                <Link className="btn-light m-1" to="/campgrounds">All Campgrounds</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div style={{ width: "100%", height: "300px" }} ref={mapContainer} className="map-container mb-2" />
                        {
                            ((deleted === false) && login) ?
                                < div className='p-sm-4' style={{ backgroundColor: "#F7F7F7" }} >
                                    <h5 className='mt-4' >Leave a Review</h5>
                                    <form name='Review-form' onSubmit={handleSubmit} >

                                        {/* <div className="mb-3">
                                        <label htmlFor="rating" className="form-label mt-3">Rating</label>
                                        <input name="review[rating]" type="range" max="5" min="1" className="form-range" />
                                    </div> */}
                                        <div className="mb-4">
                                            <fieldset className="starability-heartbeat">
                                                {/* old version of this input */}
                                                {/* <input type="radio" id="no-rate" className="input-no-rate" name="reveiw[rating]" value="0" defaultChecked aria-label="No rating." /> */}
                                                <input onChange={onchange} type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" defaultChecked aria-label="No rating." />
                                                <input onChange={onchange} type="radio" id="first-rate1" name="rating" value="1" />
                                                <label htmlFor="first-rate1" title="Terrible">1 star</label>
                                                <input onChange={onchange} type="radio" id="first-rate2" name="rating" value="2" />
                                                <label htmlFor="first-rate2" title="Not good">2 stars</label>
                                                <input onChange={onchange} type="radio" id="first-rate3" name="rating" value="3" />
                                                <label htmlFor="first-rate3" title="Average">3 stars</label>
                                                <input onChange={onchange} type="radio" id="first-rate4" name="rating" value="4" />
                                                <label htmlFor="first-rate4" title="Very good">4 stars</label>
                                                <input onChange={onchange} type="radio" id="first-rate5" name="rating" value="5" />
                                                <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                                            </fieldset>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="review">Review Text</label>
                                            {/* Old version of this input */}
                                            {/* <textarea className="form-control" name="review[review]" id="review" cols="30" rows="3" required></textarea> */}
                                            <textarea onChange={onchange} className="form-control" name="review" id="review" cols="30" rows="3" required></textarea>
                                        </div>
                                        <button style={{ backgroundColor: "#3FB1CE", color: "white" }} className="btn">Submit</button>
                                    { review > 1 && <p className='p-0 ms-3 m-0 d-inline' style={{ color: 'Green', fontWeight: 'bold', textAlign: 'center' }}>Added!</p>}
                                    </form>
                                </div>
                                :
                                null
                        }
                        <ul className="ps-0">
                            {
                                camp.reviews.map(e =>
                                    <div className="mt-3 ml-0 card" key={e._id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{e.author.username}</h5>
                                            <p className="starability-result" data-rating={e.rating}>
                                                Rated: 3 stars
                                            </p>
                                            <h6 className="card-subtitle mb-2 text-muted">{e.review}</h6>
                                            {
                                                e.author._id === localStorage.getItem('userid') ?
                                                    // <form onSubmit={()=>{setReview({id:camp._id, reviewId: camp._id}); handleDelete();}} action={`/campground/${camp._id}/review/${e._id}?_method=DELETE`} method="post">
                                                    <form className='' onSubmit={async (k) => {
                                                        k.preventDefault();
                                                        const response = await axios({
                                                            method: "post",
                                                            // url: `http://localhost:5000/campground/${camp._id}/review/${e._id}?_method=DELETE`,
                                                            url: `https://tour-explore.herokuapp.com/campground/${camp._id}/review/${e._id}?_method=DELETE`,
                                                            headers: {
                                                                "Content-Type": 'application/json',
                                                                "auth-token": `${localStorage.getItem('token')}`,
                                                                "userid": localStorage.getItem('userid')
                                                            },
                                                        })
                                                        // if(response.success === true){
                                                            setReview(review-1)
                                                        // window.location.reload(true);
                                                        // }
                                                    }}>
                                                        <button className="ms-auto border-0 bg-light">
                                                            <svg xmlns="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </button>
                                                    </form> :
                                                    null
                                            }
                                        </div>
                                    </div>
                                )}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div className="row mt-5 mb-5 pt-5">
                {
                    !camp.title ?
                        <h1 style={{ textAlign: 'center' }}>Loading...</h1> :
                        <Errorhandler />
                }
            </div>
        )
    }
}

export default Showcampground;