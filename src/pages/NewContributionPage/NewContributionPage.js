import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviewCard from "../../components/LocationsList/Cards/PreviewCard";
import "./NewContributionPage.css";

const NewContributionPage = () => {
    const [name, setName] = useState("");
    const [ticketPrice, setTicketPrice] = useState(null);
    const [locationShort, setShortLocation] = useState("");
    const [descriptionShort, setShortDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState("./Images/Locations/default.png");
    const [location, setLocation] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setLocation({
            "name": name,
            "image": selectedImage,
            "users_liked": [],
            "ticket_price": ticketPrice,
            "location_short": locationShort,
            "description_short": descriptionShort,
            "author": sessionStorage.getItem("username"),
            "status": "pending"
        });
    }, [name, selectedImage, ticketPrice, descriptionShort, locationShort])

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

    return (
        <div className='container'>
            <title>Нова пропозиція</title>
            {location && <PreviewCard location={location} />}
            <h2 className="fs-4 fw-normal">Попередній перегляд інформаційної картки</h2>
            <form onSubmit={handleSubmit}>
                <div className='card mt-1' data-bs-theme='dark'>
                    <div className='card-header'>
                        <h2>Створити нову пропозицію</h2>
                    </div>
                    <div className='card-body'>
                        <div className="image-settings">
                            <label className="ms-3 mb-1">Додайте фото локації</label>
                            <input
                                required
                                placeholder="Додайте URL-адресу зображення"
                                className='form-control mt-1 mb-2'
                                onChange={handleImageChange}
                            />
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
                        <button className='btn btn-primary btn-lg px-5' type='submit'>Готово</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewContributionPage;