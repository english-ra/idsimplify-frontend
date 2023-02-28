// CircularButton.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import classes from './CircularButton.module.css';

const CircularButton = (props) => {
    return (
        <button className={classes.button}>{props.text}</button>
    );
};

export default CircularButton;