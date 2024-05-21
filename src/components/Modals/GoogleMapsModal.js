import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './InfoModal.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useJsApiLoader } from '@react-google-maps/api';
import GoogleMapsApi from '../GoogleMapsApi/GoogleMapsApi';

const GoogleMapsModal = ({ coordinates, showModal, handleClose }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDksAbU8xH41C0A5zSOusyWVYpnXC0cl5c"
    });

    return (
        <div className='info-modal'>
            <Modal className='info-modal' show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{coordinates.lat}, {coordinates.lng}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {coordinates && <div className="google-maps-container">
                        {isLoaded ? (
                            <GoogleMapsApi center={coordinates} />
                        ) : (
                            <h2>Завантаження карти...</h2>
                        )}
                    </div>}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GoogleMapsModal;
