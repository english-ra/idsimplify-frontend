// OCSideBar.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import OCNavLink from '../Components/OCNavLink';
import OCNavLinkContainer from '../Components/OCNavLinkContainer';
import { OCLinkData } from '../OCLinkData';

import classes from './OCSideBar.module.css';

const OCSideBar = (props) => {
    return (
        <aside className={classes.aside}>

            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Organisation Center</h2>
            </div>

            <OCNavLinkContainer>
                {OCLinkData.map(link => (<OCNavLink data={link} key={link.id}>{link.text}</OCNavLink>))}
            </OCNavLinkContainer>

            <OCNavLinkContainer className={classes.secondaryNav}>
                <OCNavLink data={{link: 'control'}}>Go to Control</OCNavLink>
            </OCNavLinkContainer>
        </aside>
    );
};

export default OCSideBar;