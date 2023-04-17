// InputTextField.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import classes from './InputTextField.module.css';

const InputTextField = (props) => {
    return (
        <input
            type={props.type || 'text'}
            className={classes.textfield}
            id={props.id}
            onChange={props.onChange}
        />
    );
};

export default InputTextField;