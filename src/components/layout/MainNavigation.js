// MainNavigation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { NavLink } from "react-router-dom";

const MainNavigation = () => {
    return (
        <header>
            <NavLink to='/dashboard'>
                <h1>iDSimplify</h1>
            </NavLink>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/integrations'>
                            Integrations
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;