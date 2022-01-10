import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <Link to="highscores">
                    <h2>Highscores</h2>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;