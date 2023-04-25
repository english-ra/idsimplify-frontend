// CSideBar.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import { useAuth0 } from '@auth0/auth0-react';
import classes from './CSideBar.module.css';
import NavigationSection from './NavigationSection';
import Dropdown from '../../components/Select/Dropdown';
import InputLabel from '../../components/InputFields/InputLabel';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';


const CSideBar = (props) => {
    const [organisations, setOrganisations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const navData = [
        {
            sectionId: 0,
            sectionHeader: 'Identity Management',
            route: '/control',
            sectionLinks: [
                {
                    linkId: 0.1,
                    text: 'Users',
                    link: `users`
                },
                {
                    linkId: 0.2,
                    text: 'Groups',
                    link: `groups`
                }
            ]
        },
        {
            sectionId: 1,
            sectionHeader: 'Reporting',
            sectionLinks: [
                {
                    linkId: 1.1,
                    text: 'Scheduling',
                    link: 'scheduling'
                }
            ]
        }
    ];

    useEffect(() => {
        getUsersOrganisations();
    }, []);

    const getAccessToken = async () => {
        var accessToken = '';
        try {
            // Get the users access token
            accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });
        }
        catch (err) {
            console.log(err);
        }
        return accessToken;
    };

    const getUsersOrganisations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();
            const tenancyID = searchParams.get('tenancy-id');

            if (tenancyID === null || tenancyID === undefined) { return; }

            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/users/me/tenancies/${tenancyID}/organisations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setOrganisations(data);
            } else {
                throw new Error(data);
            }
        }
        catch (error) {
            console.log(error);
            setError(error);
        }
        setIsLoading(false);
    };

    const organisationChangeHandler = (organisation) => {
        if (!organisation) { setSearchParams({'tenancy-id': searchParams.get('tenancy-id')}); }
        else { setSearchParams({'tenancy-id': searchParams.get('tenancy-id'), 'organisation-id': organisation.id}); }
    };

    return (
        <aside className={`${classes.root} ${props.className}`}>
            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Control</h2>
            </div>

            <div className={classes.organisationSelectorDiv}>
                <InputLabel for='organisationDropdown' >Organisation:</InputLabel>
                <Dropdown
                    id='organisationDropdown'
                    className={classes.dropdown}
                    data={organisations}
                    dataKey='name'
                    value={searchParams.get('organisation-id')}
                    disabled={isLoading}
                    onSelected={organisationChangeHandler}
                />
            </div>

            <nav>
                <ul className={classes.navList}>
                    {navData.map(section => (
                        <li key={section.sectionId}>
                            <NavigationSection section={section} />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default CSideBar;