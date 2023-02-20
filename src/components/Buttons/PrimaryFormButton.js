// PrimaryFormButton.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import classes from './PrimaryFormButton.module.css';

const PrimaryFormButton = (props) => {
    return (
        <button className={classes.button}>
            {props.children}
        </button>
    );
};

export default PrimaryFormButton;