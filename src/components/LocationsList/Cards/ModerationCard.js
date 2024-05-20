import "./Card.css";
import "../../Buttons.css";
import { useEffect, useState } from "react";
import InfoModal from "../../Modals/InfoModal";

const ModerationCard = ({ location }) => {
    const [isVisible, setVisible] = useState(true);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [authorAvatar, setAuthorAvatar] = useState("images/avatars/1.png")

    useEffect(() => {
        fetch("http://localhost:8000/users/" + location.author)
            .then(res => res.json())
            .then((userdata) => {
                console.log(userdata);
                setAuthorAvatar(userdata.avatar);
            })
    }, [])
    
    const handleAcceptClick = () => {
        location.status = "accepted";
        fetch("http://localhost:8000/locations/" + location.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(location)
        }).then((res) => {
            console.log(res);
            setVisible(false);
        })
    }

    const handleInfoClick = () => {
        setShowInfoModal(true);
    }

    const handleCloseInfoModal = () => {
        setShowInfoModal(false);
    }

    const handleRejectClick = () => {
        location.status = "rejected";
        fetch("http://localhost:8000/locations/" + location.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(location)
        }).then((res) => {
            console.log(res);
            setVisible(false);
        })
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
                        <div className="card-content-elem">
                            <h3>Автор:</h3>
                            <img className="rounded-circle" src={authorAvatar}></img>
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
                </div>
            ) : (<></>)}
        </div>
    );
}

export default ModerationCard;