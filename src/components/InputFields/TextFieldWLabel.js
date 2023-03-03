// TextFieldWLabel.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import InputLabel from './InputLabel';
import InputTextField from './InputTextField';
import classes from './TextFieldWLabel.module.css';

const TextFieldWLabel = (props) => {
    return (
        <div className={`${props.className} ${classes.div}`}>
            <InputLabel for={props.id}>{props.labelText}</InputLabel>
            <br />
            <InputTextField id={props.id} />
            <br />
        </div>
    );
};

export default TextFieldWLabel;