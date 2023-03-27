// NavigationSection.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationSection.module.css';

const NavigationSection = (props) => {
    const [isLinksShowing, setIsLinksShowing] = useState(false);

    const headerClickHandler = (event) => {
        setIsLinksShowing(!isLinksShowing);
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
            {
                isLinksShowing && (
                    <ul className={classes.list}>
                        {props.section.sectionLinks.map(link => (
                            <li>
                                <NavLink
                                    className={({ isActive }) => isActive ? classes.active : undefined}
                                    to={link.link}
                                >
                                    {link.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
};

export default NavigationSection;