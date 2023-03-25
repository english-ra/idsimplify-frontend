// CSideBar.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import classes from './CSideBar.module.css';

const CSideBar = (props) => {
    return (
        <aside className={`${classes.root} ${props.className}`}>

            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Control</h2>
            </div>
        </aside>
    );
};

export default CSideBar;