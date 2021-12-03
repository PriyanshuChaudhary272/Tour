import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFuc2h1MTQ4IiwiYSI6ImNrd25zbHhxNzJwYmcycW5zMHl5OTBrc3AifQ.IIsmFvf_1fN4RZsmEAZ7Ow';

function Campgrounds() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [camps, setCamps] = useState([]);
    useEffect(() => {
        axios.get('/campground').then(res => {
            setCamps(res.data)
            // console.log(JSON.stringify(res.data))
        
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-103.5917, 40.6699],
            zoom: 3
        });
        map.current.addControl(new mapboxgl.NavigationControl({
            visualizePitch: true
            }));
        map.current.on('load', () => {
            // Add a new source from our GeoJSON data and
            // { "type": "Feature", 
            // "properties": { "id": "ak16994521",
            // "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 },
            // "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } }
            // set the 'cluster' option to true. GL-JS will
            // add the point_count property to your source data.
            const k = res.data;
            k.forEach(function(e){
                const ob = { title: e.title, id: e._id };
                e.properties = {mag: ob};
            });
            const f = {features: k}
            map.current.addSource('f', {
                type: 'geojson',
                // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                data: f,
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });
            map.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'f',
                filter: ['has', 'point_count'],
                paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#94DAFF',
                        50,
                        '#71DFE7',
                        100,
                        '#009DAE'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        15,
                        10,
                        20,
                        25,
                        30
                    ]
                }
            });

            map.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'f',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            map.current.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'f',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            // inspect a cluster on click
            map.current.on('click', 'clusters', (e) => {
                const features = map.current.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.current.getSource('f').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;

                        map.current.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });

            // When a click event occurs on a feature in
            // the unclustered-point layer, open a popup at
            // the location of the feature, with
            // description HTML from its properties.
            map.current.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const mag = JSON.parse(e.features[0].properties.mag);
                // Ensure that if the map is zoomed out such that
                // multiple copies of the feature are visible, the
                // popup appears over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(
                        `<a href="/campgrounds/${mag.id}"><h4>${mag.title}</h4></a>`
                    )
                    .addTo(map.current);
            });

            map.current.on('mouseenter', 'clusters', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', 'clusters', () => {
                map.current.getCanvas().style.cursor = '';
            });
        });
    })
    }, [])
    return (
        <div className="container my-5 pt-5">
            <h1>Find Your Place!</h1>
            <div style={{ width: "100%", height: "400px" }} ref={mapContainer} className="map-container mb-2" />
            {/* <a href="/campgrounds/add">New camp</a> */}
            <ul className="ps-0">
                {camps.map(e =>
                    <div className="card mb-3" key={e._id}>
                        <div className="row">
                            <div className="col-md-4">
                                <img className="img-fluid" src={e.images.length !== 0 ? e.images[0].url : "https://res.cloudinary.com/tourunt/image/upload/v1638346388/Tourunt/onit3y0w2jmmvgbrgraw.jpg"} alt="" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h4>{e.title}</h4>
                                    <p>{e.description}</p>
                                    <p className="text-muted">{e.location}</p>
                                    <a className="btn btn-info" href={`/campgrounds/${e._id}`}>Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    )
}
export default Campgrounds;