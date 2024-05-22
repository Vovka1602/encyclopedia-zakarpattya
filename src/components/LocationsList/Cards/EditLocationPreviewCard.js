import "./Card.css";
import "../../Buttons.css";

const EditLocationPreviewCard = ({ location }) => {
    return (
        <div className="card-container mb-1">
            <div className="card-image">
                <img className="card-image" src={location.image} alt={location.name}></img>
            </div>
            <div className="card-content">
                <h1>{location.name}</h1>
                <h4>{location.description_short}</h4>
                <div className="card-content-row">
                    {(location.location_short.length > 0) ? (
                        <div className="card-content-elem">
                            <img src="../Images/Icons/card_location.png" alt=""></img>
                            <h3 className="card-location">{location.location_short}</h3>
                        </div>
                    ) : (<></>)}
                    {(location.ticket_price !== null) ? (
                        <div>
                            {(location.ticket_price === 0) ? (
                                <div className="card-content-elem">
                                    <img src="../Images/Icons/card_ticket_free.png" alt=""></img>
                                    <h3 className="price-free">Безкоштовно</h3>
                                </div>
                            ) : (
                                <div className="card-content-elem">
                                    <img src="../Images/Icons/card_ticket.png" alt=""></img>
                                    <h3 className="price">Від {location.ticket_price} ₴</h3>
                                </div>
                            )}
                        </div>
                    ) : (<></>)}
                </div>
                <div className="button-panel">
                    <button className="button-red">
                        <div className="button-content">
                            <div className="button-icon">
                                <img src="../Images/Icons/heart_red_outline.png" alt=""></img>
                                <img className="img-hover" src="../Images/Icons/heart_black_outline.png" alt=""></img>
                            </div>
                            <div className="button-label">0</div>
                        </div>
                    </button>
                    <button className="button-blue">
                        <div className="button-content">
                            <div className="button-icon">
                                <img src="../Images/Icons/info_blue.png" alt=""></img>
                                <img className="img-hover" src="../Images/Icons/info_black.png" alt=""></img>
                            </div>
                            <div className="button-label">Детальніше</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditLocationPreviewCard;