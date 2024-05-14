import "./Card.css";

const WelcomeCard = ({ location }) => {
    return (
        <div className="card-container">
            <div className="card-image">
                <img className="card-image" src={location.image} alt={location.name}></img>
            </div>
            <div className="card-content">
                <h1>{location.name}</h1>
                <h3>Ціна квитка: від {location.ticket_price} ₴</h3>
                <h3>{location.description_short}</h3>
                <h3>Де знаходиться: {location.location_short}</h3>
                <a href={"/locationinfo/" + location.id}>
                    <button className="btn btn-primary btn-lg mt-3 px-5">Детальніше</button>
                </a>
            </div>
        </div>
    );
}
 
export default WelcomeCard;