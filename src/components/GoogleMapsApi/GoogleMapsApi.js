import React, { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

const GoogleMapsApi = () => {
    const [map, setMap] = useState(null);

    const containerStyle = {
        width: '100%',
        maxWidth: '800px',
        height: '400px',
        borderRadius: '16px',
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [center])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    );
}

export default GoogleMapsApi;