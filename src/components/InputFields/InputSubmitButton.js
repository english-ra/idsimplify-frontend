// InputSubmitButton.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import classes from './InputSubmitButton.module.css';

const InputSubmitButton = (props) => {
    return (
        <input type='submit' className={classes.button} value={props.value} disabled={props.disabled}></input>
    );
};

export default InputSubmitButton;