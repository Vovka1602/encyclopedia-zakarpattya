import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './InfoModal.css';
import "bootstrap/dist/css/bootstrap.min.css";

const InfoModal = ({ location, showModal, handleClose }) => {
    return (
        <div className='info-modal'>
            <Modal className='info-modal' show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Пропозиція <strong>{location.id}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={location.image} alt={location.name} className="modal-image img-fluid" />
                    <p>
                        <strong>Назва:</strong> {location.name}
                    </p>
                    <p>
                        <strong>Опис:</strong> {location.description_short}
                    </p>
                    <p>
                        <strong>Де:</strong> {location.location_short}
                    </p>
                    <p>
                        <strong>Ціна квитка: </strong>
                        {(location.ticket_price === 0) ? (
                            <label>Безкоштовно</label>
                        ) : (
                            <label>Від {location.ticket_price} ₴</label>
                        )}
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default InfoModal;
