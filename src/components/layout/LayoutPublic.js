// LayoutPublic.js
// iDSimplify Frontend
// Created by Reece English on 19.02.2023

import LayoutInner from "./LayoutInner";

import classes from './LayoutPublic.module.css';

const LayoutPublic = (props) => {
    return (
        <main className={classes.main}>
            <h1>iDSimplify</h1>
            {props.children}
            <LayoutInner />
        </main>
    );
};

export default LayoutPublic;