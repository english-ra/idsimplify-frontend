// LayoutInner.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import classes from './LayoutInner.module.css';

const LayoutInner = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    );
};

export default LayoutInner;