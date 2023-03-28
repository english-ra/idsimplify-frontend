// NavigationSection.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationSection.module.css';

const NavigationSection = (props) => {
    const [isLinksShowing, setIsLinksShowing] = useState(false);

    const headerClickHandler = (event) => {
        setIsLinksShowing(!isLinksShowing);
    };

    const navLinkActiveHandler = () => {
        setIsLinksShowing(true);
        return classes.active;
    };

    return (
        <div>
            {/* Section Header */}
            <button
                className={classes.headerButton}
                onClick={headerClickHandler}
            >
                {props.section.sectionHeader}
            </button>

            {/* Section Links */}
            <ul className={`${classes.list} ${isLinksShowing ? classes.active : classes.inactive}`}>
                {props.section.sectionLinks.map(link => (
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? navLinkActiveHandler() : undefined}
                            to={link.link}
                        >
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavigationSection;