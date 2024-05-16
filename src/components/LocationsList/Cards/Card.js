import "./Card.css";
import "../../Buttons.css";
import { useEffect, useState } from "react";

const LocationCard = ({ location }) => {
    const username = sessionStorage.getItem("username");

    const [likeIcon, setLikeIcon] = useState("./Images/Icons/heart_red_outline.png");
    const [likeHoverIcon, setLikeHoverIcon] = useState("./Images/Icons/heart_black_outline.png");

    const [likesNumber, setLikesNumber] = useState(0);

    useEffect(() => {
        setLikesNumber(location.users_liked.length);
        if (location.users_liked.includes(username)) {
            setLikeIcon("./Images/Icons/heart_red_filled.png");
            setLikeHoverIcon("./Images/Icons/heart_black_filled.png");
        } else {
            setLikeIcon("./Images/Icons/heart_red_outline.png");
            setLikeHoverIcon("./Images/Icons/heart_black_outline.png");
        }
    }, [location.users_liked.length]);

    const handleLikeClick = () => {
        let index = location.users_liked.indexOf(username);
        if (index >= 0) {
            location.users_liked.splice(index, 1);
        } else {
            location.users_liked.push(username);
        }
        console.log(location.users_liked);
        fetch("http://localhost:8000/locations/" + location.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(location)
        }). then((res) => {
            console.log(res);
            if (location.users_liked.includes(username)) {
                setLikesNumber(likesNumber + 1);
            } else {
                setLikesNumber(likesNumber - 1);
            }
        });
    } 

    return (
        <div className="card-container">
            <div className="card-image">
                <img className="card-image" src={location.image} alt={location.name}></img>
            </div>
            <div className="card-content">
                <h1>{location.name}</h1>
                <h4>{location.description_short}</h4>
                <div className="card-content-row">
                    <div className="card-content-elem">
                        <img src="./Images/Icons/card_location.png" alt=""></img>
                        <h3 className="card-location">{location.location_short}</h3>
                    </div>
                    {(location.ticket_price === 0) ? (
                        <div className="card-content-elem">
                            <img src="./Images/Icons/card_ticket_free.png" alt=""></img>
                            <h3 className="price-free">Безкоштовно</h3>
                        </div>
                    ) : (
                        <div className="card-content-elem">
                            <img src="./Images/Icons/card_ticket.png" alt=""></img>
                            <h3 className="price">Від {location.ticket_price} ₴</h3>
                        </div>
                    )}
                </div>
                <div className="button-panel">
                    <button className="button-red" onClick={handleLikeClick}>
                        <div className="button-content">
                            <div className="button-icon">
                                <img src={likeIcon} alt=""></img>
                                <img className="img-hover" src={likeHoverIcon} alt=""></img>
                            </div>
                            <div className="button-label">{likesNumber}</div>
                        </div>
                    </button>
                    <a href={"/locationinfo/" + location.id}>
                        <button className="button-blue">
                            <div className="button-content">
                                <div className="button-icon">
                                    <img src="./Images/Icons/info_blue.png" alt=""></img>
                                    <img className="img-hover" src="./Images/Icons/info_black.png" alt=""></img>
                                </div>
                                <div className="button-label">Детальніше</div>
                            </div>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LocationCard;