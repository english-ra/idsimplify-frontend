// OCSideBar.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import OCLink from '../Components/OCLink';
import OCNavLink from '../Components/OCNavLink';
import OCNavLinkContainer from '../Components/OCNavLinkContainer';

import classes from './OCSideBar.module.css';

const OCLinkData = [
    {
        id: 0,
        text: 'General',
        link: 'general'
    },
    {
        id: 1,
        text: 'Users',
        link: 'users'
    },
    {
        id: 2,
        text: 'Organisations',
        link: 'organisations'
    }
];

const OCSideBar = (props) => {
    return (
        <aside className={props.className}>

            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Organisation Center</h2>
            </div>

            <OCNavLinkContainer>
                {OCLinkData.map(link => (<OCNavLink data={link} key={link.id}>{link.text}</OCNavLink>))}
            </OCNavLinkContainer>

            <OCNavLinkContainer className={classes.secondaryNav}>
                <OCLink data={{ link: '/control' }}>Go to Control</OCLink>
            </OCNavLinkContainer>
        </aside>
    );
};

export default OCSideBar;