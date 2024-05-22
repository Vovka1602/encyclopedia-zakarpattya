import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./LocationInfoPage.css";
import GoogleMapsApi from "../../components/GoogleMapsApi/GoogleMapsApi";
import { useJsApiLoader } from "@react-google-maps/api";

const LocationInfoPage = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [description, setDescription] = useState("");
    const [descriptionParagraphs, setDescriptionParagraphs] = useState([]);
    const [photos, setPhotos] = useState(null);
    const [ticketPrices, setTicketPrices] = useState([]);

    useEffect(() => {
        if (description.length > 0) {
            setDescriptionParagraphs(description.split("\n"));
        }
    }, [description]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDksAbU8xH41C0A5zSOusyWVYpnXC0cl5c"
    });

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
                setCoordinates(location.coordinates);
                setDescription(location.description);
                setPhotos(location.photos);
                setTicketPrices(location.ticket_prices);
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
                    {((location.length > 0) || (location.coordinates !== null)) ? (
                        <div className="mb-5">
                            <div className="paragraph-header mt-3">
                                <img src="../Images/Icons/location.png" alt=""></img>
                                <h2>Розташування</h2>
                            </div>
                            <p>{location}</p>
                            {coordinates && <div className="google-maps-container">
                                {isLoaded ? (
                                    <GoogleMapsApi center={coordinates} />
                                ) : (
                                    <h2>Завантаження карти...</h2>
                                )}
                            </div>}
                        </div>
                    ) : (<></>)}
                    {(description.length > 0) ? (
                        <div className="paragraph-header">
                            <img src="../Images/Icons/info.png" alt=""></img>
                            <h2>Інформація</h2>
                        </div>
                    ) : (<></>)}
                    {descriptionParagraphs && descriptionParagraphs.map((paragraph, index) => (
                        <p key={index}>
                            {paragraph}
                        </p>
                    ))}
                    {(ticketPrices.length > 0) ? (
                        <div className="paragraph-header">
                            <img src="../Images/Icons/prices.png" alt=""></img>
                            <h2>Ціни квитків:</h2>
                        </div>
                    ) : (<></>)}
                    {ticketPrices && ticketPrices.map((price, index) => (
                        <p className="ms-5" key={index}>{price.for} - <strong>{price.amount} ₴</strong></p>
                    ))};
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