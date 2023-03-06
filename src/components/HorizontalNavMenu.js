// HorizontalNavMenu.js
// iDSimplify Frontend
// Created by Reece English on 05.03.2023

import HorizontalNavLink from '../components/NavLink/HorizontalNavLink';

import classes from './HorizontalNavMenu.module.css';

const HorizontalNavMenu = (props) => {
    return (
        <ul className={`${classes.menu} ${props.className}`}>
            {
                props.data.map(link => (
                    <HorizontalNavLink
                        data={link}
                        key={link.id}
                    >
                        {link.text}
                    </HorizontalNavLink>
                ))
            }
        </ul>
    );
};

export default HorizontalNavMenu;