import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink to="/">
                Accueil
            </NavLink>
            <NavLink to="/About">
                About
            </NavLink>
            <NavLink to="/News">
                News
            </NavLink>
        </div>
    );
};

export default Navigation;