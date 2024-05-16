import "./Card.css";
import "../../Buttons.css";
import { useState } from "react";

const LikeCard = ({ location }) => {
    const username = sessionStorage.getItem("username");
    const [isLiked, setLiked] = useState(true);

    const handleDeleteClick = () => {
        let index = location.users_liked.indexOf(username);
        location.users_liked.splice(index, 1);
        console.log(location.users_liked);
        fetch("http://localhost:8000/locations/" + location.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(location)
        }).then((res) => {
            console.log(res);
            setLiked(false);
        });
    }

    return (
        <div>
            {isLiked ? (
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
                            <button className="button-gray" onClick={handleDeleteClick}>
                                <div className="button-content">
                                    <div className="button-icon">
                                        <img src="./Images/Icons/trashbin_gray.png" alt=""></img>
                                        <img className="img-hover" src="./Images/Icons/trashbin_black.png" alt=""></img>
                                    </div>

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
            ) : (<></>)}
        </div>
    );
}

export default LikeCard;