import React from 'react';
import { Link } from 'react-router-dom';
import Waldo from '../imgs/waldo.jpg'


const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <img className="Waldoimg" src={Waldo} alt='Waldo'></img>
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <Link to="highscores">
                    <h2>Highscores</h2>
                </Link>

                <h1><span className="WhereSpan">Where's</span>  <span className="WallySpan">Wally</span></h1>
            </div>
        </nav>
    );
};

export default Navbar;