// SideBarNavigation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { NavLink } from "react-router-dom";

import NavigationCollapsibleSection from "../SideBarNavigation/NavigationCollapsibleSection";

import { sideBarTopNavigationData } from "../../lib/sideBarTopNavigationData";
import { sideBarBottomNavigationData } from "../../lib/sideBarBottomNavigationData";

import classes from './SideBarNavigation.module.css'

const SideBarNavigation = () => {
    return (
        <header className={classes.header}>
            <NavLink to='/dashboard'>
                <h1>iDSimplify</h1>
            </NavLink>
            <nav className={classes.nav}>
                <ul className={classes.topNavList}>
                    {
                        sideBarTopNavigationData.map(item => (
                            <li key={item.id}>
                                <NavLink to={'/' + item.link}>
                                    {item.text}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>

                <ul className={classes.bottomNavList}>
                    {
                        sideBarBottomNavigationData.map(item => (
                            <li key={item.id}>
                                <NavLink to={'/' + item.link}>
                                    {item.text}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    );
};

export default SideBarNavigation;