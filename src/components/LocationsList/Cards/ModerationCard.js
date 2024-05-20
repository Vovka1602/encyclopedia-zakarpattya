import "./Card.css";
import "../../Buttons.css";

const ModerationCard = ({ location }) => {

    return (
        <div className="card-container">
            <div className="card-image">
                <img className="card-image" src={location.image} alt={location.name}></img>
            </div>
            <div className="card-content">
                <h1>{location.name}</h1>
                <h4>{location.description_short}</h4>
                <div className="card-content-row mt-1">
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
                <h3>Автор: {location.author}</h3>
                <div className="button-panel">
                    <button className="button-red">
                        <div className="button-content">
                            <div className="button-icon">
                                <img src="./Images/Icons/cross_red.png" alt=""></img>
                                <img className="img-hover" src="./Images/Icons/cross_black.png" alt=""></img>
                            </div>
                            <div className="button-label">Відхилити</div>
                        </div>
                    </button>
                    <button className="button-green">
                        <div className="button-content">
                            <div className="button-icon">
                                <img src="./Images/Icons/tick_green.png" alt=""></img>
                                <img className="img-hover" src="./Images/Icons/tick_black.png" alt=""></img>
                            </div>
                            <div className="button-label">Прийняти</div>
                        </div>
                    </button>
                    <button className="button-blue">
                        <div className="button-content">
                            <div className="button-icon">
                                <img src="./Images/Icons/info_blue.png" alt=""></img>
                                <img className="img-hover" src="./Images/Icons/info_black.png" alt=""></img>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModerationCard;