import "./Card.css";

const LocationCard = ({ location }) => {
    return (
        <div className="card-container">
            <div className="card-image">
                <img className="card-image" src={location.image}></img>
            </div>
            <div className="card-content">
                <h1>{location.name}</h1>
                <h3>Ціна квитка: від {location.ticket_price} ₴</h3>
                <h3>{location.description_short}</h3>
                <h3>Де знаходиться: {location.location_short}</h3>
                <button className="btn btn-primary btn-lg mt-3">Детальніше</button>
            </div>
        </div>
    );
}

export default LocationCard;