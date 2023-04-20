// NavigationSection.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './NavigationSection.module.css';

const NavigationSection = (props) => {
    const location = useLocation();
    const [isLinksShowing, setIsLinksShowing] = useState(false);

    useEffect(() => {
        const section = props.section;
        for (var link of section.sectionLinks) {
            `${section.route}/${link.link}` === location.pathname && setIsLinksShowing(true);
        }
    }, [location]);

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
                    <li key={link.linkId}>
                        <NavLink
                            className={({ isActive }) => isActive ? classes.active : undefined}
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