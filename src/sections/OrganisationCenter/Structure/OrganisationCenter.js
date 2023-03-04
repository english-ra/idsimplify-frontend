// OrganisationCenter.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import { Fragment } from 'react';
import OCSideBar from './OCSideBar';
import OCGeneral from '../Pages/OCGeneral';
import OCUsers from '../Pages/OCUsers';
import OCOrganisations from '../Pages/OCOrganisations';

import classes from './OrganisationCenter.module.css';
import { Route, Routes } from 'react-router-dom';

const OrganisationCenter = (props) => {
    return (
        <Fragment>
            <OCSideBar className={classes.sideBar} />
            <main className={classes.main}>
                <Routes>
                    <Route path='/general' element={<OCGeneral />} />
                    <Route path='/organisation-center/users' element={<OCUsers />} />
                    <Route path='/organisation-center/organisations' element={<OCOrganisations />} />
                </Routes>
            </main>
        </Fragment>
    );
};

export default OrganisationCenter;