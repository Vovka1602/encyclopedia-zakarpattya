import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviewCard from "../../components/LocationsList/Cards/PreviewCard";
import "./NewContributionPage.css";
import GoogleMapsModal from "../../components/Modals/GoogleMapsModal";

const NewContributionPage = () => {
    const [name, setName] = useState("");
    const [ticketPrice, setTicketPrice] = useState(null);
    const [locationShort, setShortLocation] = useState("");
    const [descriptionShort, setShortDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState("./Images/Locations/default.png");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState(null);
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
                    if (user.admin_access === true) {
                        navigate("/");
                    }
                })
        }
    }, [navigate]);

    useEffect(() => {
        setLocation({
            "name": name,
            "image": selectedImage,
            "users_liked": [],
            "ticket_price": ticketPrice,
            "ticket_prices": [],
            "location_short": locationShort,
            "location": "",
            "description_short": descriptionShort,
            "description": "",
            "photos": [selectedImage],
            "coordinates": {
                "lat": latitude,
                "lng": longitude
            },
            "author": sessionStorage.getItem("username"),
            "status": "pending",
            "comment": "",
        });
    }, [name, selectedImage, ticketPrice, descriptionShort, locationShort, latitude, longitude])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/locations", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(location)
        })
            .then((res) => {
                navigate('/contributions');
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    const handleImageChange = (e) => {
        if (e.target.value.length > 0) {
            setSelectedImage(e.target.value);
        } else {
            setSelectedImage("./Images/Locations/default.png");
        }
    };

    const handleTicketPriceChange = (e) => {
        if (e.target.value === "") {
            setTicketPrice(null);
        } else {
            let res = parseFloat(e.target.value);
            if (!isNaN(res)) {
                setTicketPrice(res);
            }
        }
    };

    const handleLatitudeChange = (e) => {
        if (e.target.value === "") {
            setLatitude(null);
        } else {
            let res = parseFloat(e.target.value);
            if (!isNaN(res)) {
                setLatitude(res);
            }
        }
    }

    const handleLongitudeChange = (e) => {
        if (e.target.value === "") {
            setLongitude(null);
        } else {
            let res = parseFloat(e.target.value);
            if (!isNaN(res)) {
                setLongitude(res);
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
            <title>Новий внесок - Енциклопедія Закарпаття</title>
            {location && <PreviewCard location={location} />}
            <h2 className="fs-4 fw-normal">Попередній перегляд інформаційної картки</h2>
            <form onSubmit={handleSubmit}>
                <div className='card mt-1' data-bs-theme='dark'>
                    <div className='card-header'>
                        <h2>Створити нову пропозицію</h2>
                    </div>
                    <div className='card-body'>
                        <div className="image-settings mb-2">
                            <label className="ms-3 mb-1">Додайте фото локації</label>
                            <input
                                required
                                placeholder="Додайте URL-адресу зображення"
                                className='form-control mt-1 mb-2'
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="image-settings">
                            <label className="ms-3 mb-1">Вкажіть координати місця</label>
                            <div className="d-flex mb-2">
                                <input
                                    required
                                    className='form-control'
                                    onChange={handleLatitudeChange}
                                    placeholder='Широта'
                                />
                                <input
                                    required
                                    className='form-control ms-2'
                                    onChange={handleLongitudeChange}
                                    placeholder='Довгота'
                                />
                                <button className="btn btn-outline-primary ms-3" type="button" onClick={handleLocationClick}>Показати карту</button>
                            </div>
                        </div>
                        <input
                            required
                            className='form-control mb-2 mt-2'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder='Назва локації'
                        />
                        <input
                            required
                            className='form-control mb-2 mt-2'
                            value={locationShort}
                            onChange={e => setShortLocation(e.target.value)}
                            placeholder='Населений пункт або район, де знаходиться локація'
                        />
                        <input
                            required
                            className='form-control'
                            onChange={handleTicketPriceChange}
                            placeholder='Мінімальна ціна квитка (0 - безкоштовно)'
                        />
                        <input
                            required
                            className='form-control mb-2 mt-2'
                            value={descriptionShort}
                            onChange={e => setShortDescription(e.target.value)}
                            placeholder='Короткий опис'
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

export default NewContributionPage;