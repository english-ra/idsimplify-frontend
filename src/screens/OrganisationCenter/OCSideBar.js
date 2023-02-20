// OCSideBar.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import { Fragment } from 'react';
import classes from './OCSideBar.module.css';

const OCSideBar = (props) => {
    return (
        <aside className={classes.aside}>

            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Organisation Center</h2>
            </div>


        </aside>
    );
};

export default OCSideBar;