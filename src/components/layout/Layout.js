// Layout.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation className={classes.mainNavigation} />
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    );
};

export default Layout;