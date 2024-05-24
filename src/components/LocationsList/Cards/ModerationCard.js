import "./Card.css";
import "../../Buttons.css";
import { useEffect, useState } from "react";
import InfoModal from "../../Modals/InfoModal";
import AcceptModal from "../../Modals/AcceptModal";
import RejectModal from "../../Modals/RejectModal";
import GoogleMapsModal from "../../Modals/GoogleMapsModal";

const ModerationCard = ({ location }) => {
    const [isVisible, setVisible] = useState(true);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [authorAvatar, setAuthorAvatar] = useState("images/avatars/1.png");
    const [showGoogleMapsModal, setShowGoogleMapsModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/users/" + location.author)
            .then(res => res.json())
            .then((userdata) => {
                console.log(userdata);
                setAuthorAvatar(userdata.avatar);
            })
    }, [location.author])

    const handleAcceptConfirm = (message) => {
        location.status = "accepted";
        location.comment = message;
        fetch("http://localhost:8000/locations/" + location.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(location)
        }).then((res) => {
            console.log(res);
            setShowAcceptModal(false);
            setVisible(false);
        });
    }

    const handleAcceptClick = () => {
        setShowAcceptModal(true)
    }

    const handleRejectConfirm = (message) => {
        location.status = "rejected";
        location.comment = message;
        fetch("http://localhost:8000/locations/" + location.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(location)
        }).then((res) => {
            console.log(res);
            setShowAcceptModal(false);
            setVisible(false);
        });
    }

    const handleRejectClick = () => {
        setShowRejectModal(true);
    }

    const handleInfoClick = () => {
        setShowInfoModal(true);
    }

    const handleCloseInfoModal = () => {
        setShowInfoModal(false);
    }

    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
    }

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
    }

    const handleLocationClick = () => {
        setShowGoogleMapsModal(true);
    }

    const handleCloseGoogleMapsModal = () => {
        setShowGoogleMapsModal(false);
    }

    return (
        <div>
            {isVisible ? (
                <div className="card-container">
                    <div className="card-image">
                        <img className="card-image" src={location.image} alt={location.name}></img>
                    </div>
                    <div className="card-content">
                        <div className="card-content-elem mt-1">
                            <h1 className="contribution-id mt-3">#{location.id}</h1>
                            <h2 className="ms-3 mt-4">{location.name}</h2>
                        </div>
                        <div className="d-flex mt-2">
                            <h3 className="me-3 mt-2">Координати: {location.coordinates.lat}, {location.coordinates.lng}</h3>
                            <button className="btn btn-outline-primary btn-lg px-4 ms-3" onClick={handleLocationClick}>Карта</button>
                        </div>
                        <div className="card-content-elem">
                            <h3>Автор:</h3>
                            <img className="rounded-circle" src={authorAvatar} alt=""></img>
                            <h3>{location.author}</h3>
                        </div>
                        <div className="button-panel">
                            <button className="button-red" onClick={handleRejectClick}>
                                <div className="button-content">
                                    <div className="button-icon">
                                        <img src="./Images/Icons/cross_red.png" alt=""></img>
                                        <img className="img-hover" src="./Images/Icons/cross_black.png" alt=""></img>
                                    </div>
                                    <div className="button-label">Відхилити</div>
                                </div>
                            </button>
                            <button className="button-green" onClick={handleAcceptClick}>
                                <div className="button-content">
                                    <div className="button-icon">
                                        <img src="./Images/Icons/tick_green.png" alt=""></img>
                                        <img className="img-hover" src="./Images/Icons/tick_black.png" alt=""></img>
                                    </div>
                                    <div className="button-label">Прийняти</div>
                                </div>
                            </button>
                            <button className="button-blue" onClick={handleInfoClick}>
                                <div className="button-content">
                                    <div className="button-icon">
                                        <img src="./Images/Icons/info_blue.png" alt=""></img>
                                        <img className="img-hover" src="./Images/Icons/info_black.png" alt=""></img>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <InfoModal location={location} showModal={showInfoModal} handleClose={handleCloseInfoModal} />
                    <AcceptModal location={location} showModal={showAcceptModal} handleConfirm={handleAcceptConfirm} handleClose={handleCloseAcceptModal} />
                    <RejectModal location={location} showModal={showRejectModal} handleConfirm={handleRejectConfirm} handleClose={handleCloseRejectModal} />
                    <GoogleMapsModal coordinates={{ "lat": location.coordinates.lat, "lng": location.coordinates.lng }} showModal={showGoogleMapsModal} handleClose={handleCloseGoogleMapsModal} />
                </div>
            ) : (<></>)}
        </div>
    );
}

export default ModerationCard;