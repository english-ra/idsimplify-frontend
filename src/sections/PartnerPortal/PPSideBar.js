// PPSideBar.js
// iDSimplify Frontend
// Created by Reece English on 21.04.2023

import { useAuth0 } from '@auth0/auth0-react';
import classes from './PPSideBar.module.css';
import Dropdown from '../../components/Select/Dropdown';
import InputLabel from '../../components/InputFields/InputLabel';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SquareNavLink from '../../components/NavLink/SquareNavLink';

const navData = [
    {
        id: 0.1,
        text: 'Users',
        link: 'users'
    }
];

const PPSideBar = (props) => {
    const [organisations, setOrganisations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <aside className={`${classes.root} ${props.className}`}>
            <div className={classes.logo}>
                <h1>iD</h1>
            </div>

            <nav>
                <ul className={classes.navList}>
                    {navData.map(link => (
                        <li key={link.id}>
                            <SquareNavLink data={link} />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default PPSideBar;