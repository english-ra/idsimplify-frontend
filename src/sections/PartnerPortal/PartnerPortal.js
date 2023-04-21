// PartnerPortal.js
// iDSimplify Frontend
// Created by Reece English on 04.03.2023

import { Outlet } from "react-router-dom";
import PPSideBar from './PPSideBar';
import ProfileCorner from '../../components/ProfileCorner/ProfileCorner';
import classes from './PartnerPortal.module.css';

const PartnerPortal = (props) => {
    return (
        <>
            <PPSideBar className={classes.sideBar} />
            <ProfileCorner className={classes.profileCorner} />
            <main className={classes.main}>
                <Outlet />
            </main>
        </>
    );
};

export default PartnerPortal;