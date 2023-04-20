// InputLabel.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import classes from './InputLabel.module.css';

const InputLabel = (props) => {
    return (
        <label className={classes.label} htmlFor={props.for}>
            {props.children}
        </label>
    );
};

export default InputLabel;