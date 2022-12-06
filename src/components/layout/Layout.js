// Layout.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;