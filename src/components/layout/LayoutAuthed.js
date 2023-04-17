// LayoutAuthed.js
// iDSimplify Frontend
// Created by Reece English on 19.02.2023

import CreateRootOrganisation from "../../sections/Join/CreateRootOrganisation";
import LayoutInner from "./LayoutInner";

import classes from './LayoutAuthed.module.css';
import ProfileCorner from "../ProfileCorner/ProfileCorner";

const LayoutAuthed = (props) => {
    return (
        <main className={classes.main}>
            <h1>iDSimplify</h1>
            <ProfileCorner className={classes.profile} />
            {props.children}
        </main>
    );
};

export default LayoutAuthed;