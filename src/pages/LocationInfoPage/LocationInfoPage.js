import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./LocationInfoPage.css";
import GoogleMapsApi from "../../components/GoogleMapsApi/GoogleMapsApi";
import { useJsApiLoader } from "@react-google-maps/api";

const LocationInfoPage = () => {
    const { id } = useParams();
    const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionParagraphs, setDescriptionParagraphs] = useState([]);
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        if (description.length > 0) {
            setDescriptionParagraphs(description.split("\n"));
        }
    }, [description]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDksAbU8xH41C0A5zSOusyWVYpnXC0cl5c"
    })

    useEffect(() => {
        fetch("http://localhost:8000/locations/" + id)
            .then((response) => {
                if (response.status === 404) {
                    setTitle("Помилка 404. Здається, такої локації не існує");
                    throw new Error("404 Location not found: Invalid ID");
                } else {
                    return response.json();
                }
            })
            .then((location) => {
                setTitle(location.name);
                setLocation(location.location);
                setDescription(location.description);
                setPhotos(location.photos);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [id]);

    useEffect(() => {
        console.log(photos);
    }, [photos])

    return (
        <div className="info-page px-4 me-0 ms-4">
            <title>{title}</title>
            <h1 className="mt-4">{title}</h1>
            <div className="row mt-4">
                <div className="col-8 px-5 mt-4">
                    {(location.length > 0) ? (
                        <div className="mb-5">
                            <div className="paragraph-header">
                                <img src="../Images/Icons/location.png" alt=""></img>
                                <h2>Розташування</h2>
                            </div>
                            <p>{location}</p>
                            <div className="google-maps-container">
                                {isLoaded ? (
                                    <GoogleMapsApi />
                                ) : (
                                    <h2>Завантаження карти...</h2>
                                )}
                            </div>
                        </div>
                    ) : (<></>)}
                    <div className="paragraph-header">
                        <img src="../Images/Icons/info.png" alt=""></img>
                        <h2>Інформація</h2>
                    </div>
                    {descriptionParagraphs && descriptionParagraphs.map((paragraph, index) => (
                        <p key={index}>
                            {paragraph}
                        </p>
                    ))}
                </div>
                <div className="col">
                    <div className="photos-column">
                        {photos && photos.map((image, index) => {
                            return (
                                <img
                                    className="location-photo"
                                    key={index}
                                    src={image}
                                    alt={title}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationInfoPage;