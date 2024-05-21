import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const GoogleMapsApi = ({center}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDksAbU8xH41C0A5zSOusyWVYpnXC0cl5c' // Вставте ваш API-ключ сюди
    });

    const [map, setMap] = useState(null);

    const containerStyle = {
        width: '100%',
        maxWidth: '800px',
        height: '25vw',
        borderRadius: '10px',
        border: "3px solid rgba(250, 250, 250, 0.5)"
    };

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId="hybrid"
        >
            <Marker position={center} />
        </GoogleMap>
    ) : (<></>);
}

export default GoogleMapsApi;
