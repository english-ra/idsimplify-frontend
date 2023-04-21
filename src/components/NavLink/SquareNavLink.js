// SquareNavLink.js
// iDSimplify Frontend
// Created by Reece English on 21.04.2023

import { NavLink } from "react-router-dom";

import classes from './SquareNavLink.module.css';

const SquareNavLink = (props) => {
    return (
        <li className={classes.li}>
            <NavLink
                className={({ isActive }) => isActive ? classes.active : undefined}
                to={props.data.link}
            >
                <div className={classes.iconDiv} />
                {props.data.text}
            </NavLink>
        </li>
    );
};

export default SquareNavLink;