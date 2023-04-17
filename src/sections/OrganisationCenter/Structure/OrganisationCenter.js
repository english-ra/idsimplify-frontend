// OrganisationCenter.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import { Outlet, redirect } from 'react-router-dom';
import ProfileCorner from '../../../components/ProfileCorner/ProfileCorner';

import OCSideBar from './OCSideBar';

import classes from './OrganisationCenter.module.css';

const OrganisationCenter = (props) => {
    return (
        <>
            <OCSideBar className={classes.sideBar} />
            <ProfileCorner className={classes.profileCorner} />
            <main className={classes.main}>
                <Outlet />
            </main>
        </>
    );
};

export default OrganisationCenter;