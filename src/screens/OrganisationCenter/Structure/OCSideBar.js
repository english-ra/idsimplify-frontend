// OCSideBar.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import OCNavLinkContainer from '../Components/OCNavLinkContainer';
import classes from './OCSideBar.module.css';

const OCSideBar = (props) => {
    return (
        <aside className={classes.aside}>

            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Organisation Center</h2>
            </div>

            <OCNavLinkContainer className={classes.primaryNav}>
                <li>General</li>
                <li>Users</li>
                <li>Organisations</li>
            </OCNavLinkContainer>

            <OCNavLinkContainer className={classes.secondaryNav}>
                <li>Go to Control</li>
            </OCNavLinkContainer>

        </aside>
    );
};

export default OCSideBar;