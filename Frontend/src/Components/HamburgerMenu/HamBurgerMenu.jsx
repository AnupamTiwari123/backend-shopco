import { useState } from 'react';
import { Link } from 'react-router-dom';

import './HamBurgerMenu.css';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-menu">
            <div className="hamburger-icon" onClick={toggleMenu}>
                {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
            </div>
            <ul className={`menu ${isOpen ? 'open' : ''}`}>
                <Link to={"/newarrivals"}><li>New Arrivals</li></Link>
                <Link to={"/products"}><li>All Product</li></Link>
                <Link to={"/products/Men's%20Clothing"}><li>Mens</li></Link>
                <Link to={"/products/Women's%20Clothing"}><li>Womens</li></Link>
                <Link to={"/products/Kids' Clothing"}><li>Kids</li></Link>
                <Link to={"/products/Electronics"}><li>Electronics</li></Link>
            </ul>
        </div>
    );
};

export default HamburgerMenu;
