// OrganisationCenter.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import { Fragment } from 'react';
import OCSideBar from './OCSideBar';
import classes from './OrganisationCenter.module.css';

const OrganisationCenter = (props) => {
    return (
        <Fragment>
            <OCSideBar />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default OrganisationCenter;