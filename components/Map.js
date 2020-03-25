import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

export default function Map({lat, lng, isLoading}) {


  const [viewport, setViewport] = useState({
    width: '100%',
    height: '50vh',
    latitude: 33,
    longitude: 0.9,
    zoom: 11.5
  });

  useEffect(()=>{
    console.log("viewport updated",viewport)
    // state.details.location && setVenueLocation(state.details.location)
  },[viewport])

  const KEY = process.env.key;

  return (

    <div className="map">
      {isLoading ? (<p>...loading map</p>) :
      
      

      (<ReactMapGL
        mapboxApiAccessToken={KEY}
        {...viewport}
        mapStyle="mapbox://styles/bobbidigi/ck7jfv8s83bvh1ipswl1hv564"
        onViewportChange={ (viewport) => setViewport({
              width: '100vw',
              height: '50vh',
              marginBottom: '15rem',
              latitude: lat,
              longitude: lng,
              zoom: 11.666
            })}>
         <Marker latitude={lat}
                  longitude={lng}
         >
           {/* <div>
             <img className="marker-icon" src={icon}/>
           </div> */}
         </Marker>
      </ReactMapGL>)}
    </div>
  );
}