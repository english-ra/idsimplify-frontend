// SquareNavLink.js
// iDSimplify Frontend
// Created by Reece English on 21.04.2023

import { NavLink, useLocation } from "react-router-dom";

import classes from './SquareNavLink.module.css';

const SquareNavLink = (props) => {
    const location = useLocation();

    return (
        <li className={classes.li}>
            <NavLink
                className={({ isActive }) => isActive ? classes.active : undefined}
                to={`${props.data.link}${location.search}`}
            >
                <div className={classes.iconDiv} />
                {props.data.text}
            </NavLink>
        </li>
    );
};

export default SquareNavLink;