import React, { useState, useEffect} from 'react'
import axios from 'axios';
export default function Fake() {

const [camps, setCamps] = useState([]);
useEffect(() => {
    axios.get('/fakeuser').then(res => {
        setCamps(res.data)
    })
}, [])
return (
    <div className="container my-5 pt-5">
        <h1>{camps.username}</h1>
        <p>{camps.password}</p>
    </div>
)
}

