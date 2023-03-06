// LayoutPublic.js
// iDSimplify Frontend
// Created by Reece English on 19.02.2023

import CreateRootOrganisation from "../../sections/Join/CreateRootOrganisation";
import LayoutInner from "./LayoutInner";

import classes from './LayoutPublic.module.css';

const LayoutPublic = (props) => {
    return (
        <main className={classes.main}>
            <h1>iDSimplify</h1>
            {props.children}
        </main>
    );
};

export default LayoutPublic;