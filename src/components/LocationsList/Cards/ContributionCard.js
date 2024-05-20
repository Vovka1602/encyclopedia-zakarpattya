import "./Card.css";
import "../../Buttons.css";
import { useState } from "react";
import InfoModal from "../../Modals/InfoModal";

const ContributionCard = ({ location }) => {
    const username = sessionStorage.getItem("username");
    const [isVisible, setVisible] = useState(true);
    const [showInfoModal, setShowInfoModal] = useState(false);

    const handleDeleteClick = () => {
        let index = location.users_liked.indexOf(username);
        location.users_liked.splice(index, 1);
        console.log(location.users_liked);
        fetch("http://localhost:8000/locations/" + location.id, {
            method: "DELETE"
        }).then((res) => {
            console.log(location.id + "deleted");
            setVisible(false);
        });
    }

    const handleInfoClick = () => {
        setShowInfoModal(true);
    }

    const handleCloseInfoModal = () => {
        setShowInfoModal(false);
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
                        </div>
                        <h2>{location.name}</h2>
                        <div className="d-flex mt-3">
                            <h3 className="me-3">Статус:</h3>
                            {(location.status === "accepted") ? (
                                <div className="d-flex">
                                    <img className="status-icon" src="Images/Icons/status_accepted.png"></img>
                                    <h3 className="status-accepted">Прийнято</h3>
                                </div>
                            ) : (location.status === "pending") ? (
                                <div className="d-flex">
                                    <img className="status-icon" src="Images/Icons/status_pending.png"></img>
                                    <h3 className="status-pending">Очікує на модерацію</h3>
                                </div>
                            ) : (
                                <div className="d-flex">
                                    <img className="status-icon" src="Images/Icons/status_rejected.png"></img>
                                    <h3 className="status-rejected">Відхилено</h3>
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
                            <button className="button-blue" onClick={handleInfoClick}>
                                <div className="button-content">
                                    <div className="button-icon">
                                        <img src="./Images/Icons/info_blue.png" alt=""></img>
                                        <img className="img-hover" src="./Images/Icons/info_black.png" alt=""></img>
                                    </div>
                                    <div className="button-label">Детальніше</div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <InfoModal location={location} showModal={showInfoModal} handleClose={handleCloseInfoModal} />
                </div>
            ) : (<></>)}
        </div>
    );
}

export default ContributionCard;