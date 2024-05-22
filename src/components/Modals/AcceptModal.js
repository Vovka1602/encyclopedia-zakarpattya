import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './InfoModal.css';
import "bootstrap/dist/css/bootstrap.min.css";

const AcceptModal = ({ location, showModal, handleConfirm, handleClose }) => {
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleConfirmClick = () => {
        if (message.length > 0) {
            console.log(message);
            handleConfirm(message);
        } else {
            alert("Поле 'Повідомлення-коментар' не може бути порожнім");
        }
    }

    return (
        <div className='confirmation-modal'>
            <Modal className='confirmation-modal' show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Прийняти пропозицію <strong>{location.id}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className='mb-2'>Повідомлення-коментар:</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={message}
                        onChange={handleMessageChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="button-panel">
                        <button className="button-red" onClick={handleClose}>
                            <div className="button-content">
                                <div className="button-icon">
                                    <img src="./Images/Icons/cross_red.png" alt=""></img>
                                    <img className="img-hover" src="./Images/Icons/cross_black.png" alt=""></img>
                                </div>
                                <div className="button-label">Скасувати</div>
                            </div>
                        </button>
                        <button className="button-green" onClick={handleConfirmClick}>
                            <div className="button-content">
                                <div className="button-icon">
                                    <img src="./Images/Icons/tick_green.png" alt=""></img>
                                    <img className="img-hover" src="./Images/Icons/tick_black.png" alt=""></img>
                                </div>
                                <div className="button-label">Готово</div>
                            </div>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AcceptModal;