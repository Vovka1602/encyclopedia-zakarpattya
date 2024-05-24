import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleMapsModal from "../../components/Modals/GoogleMapsModal";
import EditLocationPreviewCard from "../../components/LocationsList/Cards/EditLocationPreviewCard";

const EditLocationPage = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [defaultName, setDefaultName] = useState("");
    const [defaultTicketPrice, setDefaultTicketPrice] = useState(null);
    const [defaultLocationShort, setDefaultShortLocation] = useState("");
    const [defaultDescriptionShort, setDefaultShortDescription] = useState("");
    const [defaultSelectedImage, setDefaultSelectedImage] = useState("./Images/Locations/default.png");
    const [defaultLatitude, setDefaultLatitude] = useState(null);
    const [defaultLongitude, setDefaultLongitude] = useState(null);

    const [editedName, setEditedName] = useState("");
    const [editedTicketPrice, setEditedTicketPrice] = useState(null);
    const [editedLocationShort, setEditedShortLocation] = useState("");
    const [editedDescriptionShort, setEditedShortDescription] = useState("");
    const [editedSelectedImage, setEditedSelectedImage] = useState("");
    const [editedLatitude, setEditedLatitude] = useState(null);
    const [editedLongitude, setEditedLongitude] = useState(null);

    const [name, setName] = useState("");
    const [ticketPrice, setTicketPrice] = useState(null);
    const [locationShort, setShortLocation] = useState("");
    const [descriptionShort, setShortDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState("./Images/Locations/default.png");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [author, setAuthor] = useState("");
    const [photos, setPhotos] = useState([]);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [locationData, setLocationData] = useState(null);
    const [usersLiked, setUsersLiked] = useState([]);
    const [comment, setComment] = useState("");
    const [ticketPrices, setTicketPrices] = useState([]);

    const [showGoogleMapsModal, setShowGoogleMapsModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === '' || username === null) {
            navigate('/welcome');
        } else {
            fetch("http://localhost:8000/users/" + username)
                .then(res => res.json())
                .then(user => {
                    if (user.admin_access === false) {
                        navigate("/");
                    }
                })
        }
    }, [navigate]);

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
                setTitle("Редагування локації '" + location.name + "'");
                setDefaultName(location.name);
                setDefaultSelectedImage(location.image);
                setDefaultTicketPrice(location.ticket_price);
                setDefaultShortLocation(location.location_short);
                setDefaultShortDescription(location.description_short);
                setDefaultLatitude(location.coordinates.lat);
                setDefaultLongitude(location.coordinates.lng);
                setPhotos(location.photos);
                setLocation(location.location);
                setDescription(location.description);
                setAuthor(location.author);
                setUsersLiked(location.users_liked);
                setTicketPrices(location.ticket_prices);
                setComment(location.comment);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [id]);

    useEffect(() => {
        if (editedSelectedImage === "" || editedSelectedImage === null) {
            setSelectedImage(defaultSelectedImage);
        } else {
            setSelectedImage(editedSelectedImage);
        }
        if (editedName === "" || editedName === null) {
            setName(defaultName);
        } else {
            setName(editedName);
        }
        if (editedTicketPrice === null) {
            setTicketPrice(defaultTicketPrice);
        } else {
            setTicketPrice(editedTicketPrice);
        }
        if (editedLocationShort === "" || editedLocationShort === null) {
            setShortLocation(defaultLocationShort);
        } else {
            setShortLocation(editedLocationShort);
        }
        if (editedDescriptionShort === "" || editedDescriptionShort === null) {
            setShortDescription(defaultDescriptionShort);
        } else {
            setShortDescription(editedDescriptionShort);
        }
        if (editedLatitude === null) {
            setLatitude(defaultLatitude);
        } else {
            setLatitude(editedLatitude);
        }
        if (editedLongitude === null) {
            setLongitude(defaultLongitude);
        } else {
            setLongitude(editedLongitude);
        }
    }, [defaultName, editedName, name, defaultSelectedImage, editedSelectedImage, selectedImage,
        defaultTicketPrice, editedTicketPrice, ticketPrice, defaultLocationShort, editedLocationShort, locationShort,
        defaultDescriptionShort, editedDescriptionShort, descriptionShort,
        defaultLatitude, editedLatitude, latitude, defaultLongitude, editedLongitude, longitude
    ])

    useEffect(() => {
        setLocationData({
            "id": id,
            "name": name,
            "image": selectedImage,
            "users_liked": usersLiked,
            "ticket_price": ticketPrice,
            "ticket_prices": ticketPrices,
            "location_short": locationShort,
            "location": location,
            "description_short": descriptionShort,
            "description": description,
            "photos": photos,
            "coordinates": {
                "lat": latitude,
                "lng": longitude
            },
            "author": author,
            "status": "accepted",
            "comment": comment, 
        });
    }, [id, name, selectedImage, ticketPrice, descriptionShort, locationShort, latitude, longitude,
        author, description, location, photos, usersLiked, comment, ticketPrices
    ]);

    useEffect(() => {
        let newPhotos = photos;
        newPhotos[0] = selectedImage;
        setPhotos(newPhotos);
    }, [selectedImage, photos])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/locations/" + id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(locationData)
        })
            .then((res) => {
                navigate('/administering');
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    const handleImageChange = (e) => {
        if (e.target.value.length > 0) {
            setEditedSelectedImage(e.target.value);
        } else {
            setEditedSelectedImage("");
        }
    };

    const handleTicketPriceChange = (e) => {
        if (e.target.value === "") {
            setEditedTicketPrice(null);
        } else {
            let res = parseFloat(e.target.value);
            if (!isNaN(res)) {
                setEditedTicketPrice(res);
            }
        }
    };

    const handleLatitudeChange = (e) => {
        if (e.target.value === "") {
            setEditedLatitude(null);
        } else {
            let res = parseFloat(e.target.value);
            if (!isNaN(res)) {
                setEditedLatitude(res);
            }
        }
    }

    const handleLongitudeChange = (e) => {
        if (e.target.value === "") {
            setEditedLongitude(null);
        } else {
            let res = parseFloat(e.target.value);
            if (!isNaN(res)) {
                setEditedLongitude(res);
            }
        }
    }

    const handleLocationClick = () => {
        setShowGoogleMapsModal(true);
    }

    const handleCloseGoogleMapsModal = () => {
        setShowGoogleMapsModal(false);
    }

    return (
        <div className='container'>
            <title>Редагування локації - Енциклопедія Закарпаття</title>
            {locationData && <EditLocationPreviewCard location={locationData} />}
            <h2 className="fs-4 fw-normal">Попередній перегляд інформаційної картки</h2>
            <form onSubmit={handleSubmit}>
                <div className='card mt-1' data-bs-theme='dark'>
                    <div className='card-header'>
                        <h2>{title}</h2>
                    </div>
                    <div className='card-body'>
                        <div className="image-settings">
                            <label className="ms-3 mb-1">Змінити фото локації</label>
                            <input
                                placeholder="Додайте URL-адресу зображення"
                                className='form-control mt-1 mb-2'
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="image-settings">
                            <label className="ms-3 mb-1">Змінити координати місця</label>
                            <div className="d-flex mb-2">
                                <input
                                    className='form-control'
                                    onChange={handleLatitudeChange}
                                    placeholder='Широта'
                                />
                                <input
                                    className='form-control ms-2'
                                    onChange={handleLongitudeChange}
                                    placeholder='Довгота'
                                />
                                <button className="btn btn-outline-primary ms-3" type="button" onClick={handleLocationClick}>Показати карту</button>
                            </div>
                        </div>
                        <input
                            className='form-control mb-2 mt-2'
                            value={editedName}
                            onChange={e => setEditedName(e.target.value)}
                            placeholder='Нова назва локації'
                        />
                        <input
                            className='form-control mb-2 mt-2'
                            value={editedLocationShort}
                            onChange={e => setEditedShortLocation(e.target.value)}
                            placeholder='Змінити населений пункт або район, де знаходиться локація'
                        />
                        <input
                            className='form-control'
                            onChange={handleTicketPriceChange}
                            placeholder='Нова мінімальна ціна квитка (0 - безкоштовно)'
                        />
                        <input
                            className='form-control mb-2 mt-2'
                            value={editedDescriptionShort}
                            onChange={e => setEditedShortDescription(e.target.value)}
                            placeholder='Змінити короткий опис'
                        />
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-primary btn-lg px-5' type='submit'>
                            <div className="btn-text">Готово</div>
                        </button>
                    </div>
                </div>
            </form>
            <GoogleMapsModal coordinates={{ "lat": latitude, "lng": longitude }} showModal={showGoogleMapsModal} handleClose={handleCloseGoogleMapsModal} />
        </div>
    );
}

export default EditLocationPage;