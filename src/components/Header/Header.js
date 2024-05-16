import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = ({ title }) => {
    return (
        <div className="header">
            <h2>{title}</h2>
        </div>
    );
}
 
export default Header;