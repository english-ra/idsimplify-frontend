// SideBarNavigation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { NavLink } from "react-router-dom";

import classes from './SideBarNavigation.module.css'

const SideBarNavigation = () => {
    return (
        <header className={classes.header}>
            <NavLink to='/dashboard'>
                <h1>iDSimplify</h1>
            </NavLink>
            <nav className={classes.nav}>
                <ul className={classes.topNavList}>
                    <li>
                        <NavLink to='/dashboard'>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/integrations'>
                            Integrations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/test'>
                            Test
                        </NavLink>
                    </li>
                </ul>

                <ul className={classes.bottomNavList}>
                    <li>
                        <NavLink to='/integrations'>
                            Integrations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/settings'>
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default SideBarNavigation;