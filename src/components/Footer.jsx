import React, { useState } from 'react'

export default function Footer() {
    const y = new Date().getFullYear();
    const [Year, setYear] = useState(y);
    return (
        <div className="footer bg-dark py-3 mt-auto">
            <div className="container">
                <span className="text-muted mx-auto">&copy; Campground {Year}</span>
            </div>
        </div>
    )
}
