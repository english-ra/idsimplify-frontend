// HorizontalNavLink.js
// iDSimplify Frontend
// Created by Reece English on 05.03.2023

import { NavLink } from "react-router-dom";

import classes from './HorizontalNavLink.module.css';

const HorizontalNavLink = (props) => {
    return (
        <li className={classes.li}>
            <NavLink
                className={({ isActive }) => isActive ? classes.active : undefined}
                to={props.data.link}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default HorizontalNavLink;