// LayoutPublic.js
// iDSimplify Frontend
// Created by Reece English on 19.02.2023

import { Fragment } from "react";

const LayoutPublic = (props) => {
    return (
        <Fragment>
            <h1>iDSimplify</h1>
            <main /*className={classes.main}*/>{props.children}</main>
        </Fragment>
    );
};

export default LayoutPublic;