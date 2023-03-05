// OrganisationCenter.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import { Outlet } from 'react-router-dom';

import OCSideBar from './OCSideBar';

import classes from './OrganisationCenter.module.css';

const OrganisationCenter = (props) => {
    return (
        <>
            <OCSideBar className={classes.sideBar} />
            <main className={classes.main}>
                <Outlet />
            </main>
        </>
    );
};

export default OrganisationCenter;