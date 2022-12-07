// Layout.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { Fragment } from "react";

import SideBarNavigation from "./SideBarNavigation";

import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <Fragment>
            <SideBarNavigation />
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    );
};

export default Layout;