// NavigationSublink.js
// iDSimplify Frontend
// Created by Reece English on 12.12.2022

import { NavLink } from "react-router-dom";

import classes from './NavigationSublink.module.css';

const NavigationSublink = (props) => {
    return (
        <li className={classes.li}>
            <NavLink to={props.item.link}>
                {props.item.text}
            </NavLink>
        </li>
    );
};

export default NavigationSublink;