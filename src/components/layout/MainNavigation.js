// MainNavigation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { NavLink } from "react-router-dom";

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <NavLink to='/dashboard'>
                <h1>iDSimplify</h1>
            </NavLink>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to='/integrations'>
                            Integrations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/integrations'>
                            Test
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;