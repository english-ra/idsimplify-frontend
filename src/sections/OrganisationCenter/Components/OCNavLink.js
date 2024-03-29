// OCNavLink.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import { NavLink } from "react-router-dom";

import classes from './OCNavLink.module.css';

const OCNavLink = (props) => {
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

export default OCNavLink;