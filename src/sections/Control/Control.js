// Control.js
// iDSimplify Frontend
// Created by Reece English on 04.03.2023

import { Outlet } from "react-router-dom";
import ProfileCorner from "../../components/ProfileCorner/ProfileCorner";

import classes from './Control.module.css';
import CSideBar from "./CSideBar";

const Control = (props) => {
    return (
        <>
            <CSideBar className={classes.sideBar} />
            <ProfileCorner className={classes.profileCorner} />
            <main className={classes.main}>
                <Outlet />
            </main>
        </>
    );
};

export default Control;