// OCLink.js
// iDSimplify Frontend
// Created by Reece English on 05.03.2023

import { Link } from "react-router-dom";

import classes from './OCLink.module.css';

const OCLink = (props) => {
    return (
        <li>
            <Link
                className={classes.link}
                to={props.data.link}
            >
                {props.children}
            </Link>
        </li>
    );
};

export default OCLink;