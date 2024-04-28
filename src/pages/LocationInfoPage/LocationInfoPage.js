import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LocationInfoPage = () => {
    const { id } = useParams();

    return (
        <h2>Інформація про {id}</h2>
    );
}

export default LocationInfoPage;