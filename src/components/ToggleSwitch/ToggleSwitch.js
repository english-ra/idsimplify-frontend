// ToggleSwitch.js
// iDSimplify Frontend
// Created by Reece English on 01.03.2023

import classes from './ToggleSwitch.module.css';

// https://www.w3schools.com/howto/howto_css_switch.asp

const ToggleSwitch = (props) => {
    return (
        <label className={classes.switch}>
            <input type='checkbox' />
            <span className={`${classes.slider} ${classes.round}`}></span>
        </label>
    );
};

export default ToggleSwitch;