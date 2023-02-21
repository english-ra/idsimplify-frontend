// OCSideBar.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import OCNavLink from '../Components/OCNavLink';
import OCNavLinkContainer from '../Components/OCNavLinkContainer';

import classes from './OCSideBar.module.css';

const OCSideBar = (props) => {
    return (
        <aside className={classes.aside}>

            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Organisation Center</h2>
            </div>

            <OCNavLinkContainer>
                <OCNavLink>General</OCNavLink>
                <OCNavLink>Users</OCNavLink>
                <OCNavLink>Organisations</OCNavLink>
            </OCNavLinkContainer>

            <OCNavLinkContainer className={classes.secondaryNav}>
                <OCNavLink>Go to Control</OCNavLink>
            </OCNavLinkContainer>

        </aside>
    );
};

export default OCSideBar;