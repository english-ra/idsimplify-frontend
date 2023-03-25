// AuthLandingPage.js
// iDSimplify Frontend
// Created by Reece English on 06.03.2023

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAuthed from '../../components/layout/LayoutAuthed';
import LayoutInner from '../../components/layout/LayoutInner';
import Dropdown from '../../components/Select/Dropdown';

import classes from './AuthLandingPage.module.css';

const AuthLandingPage = (props) => {
    const { getAccessTokenWithPopup } = useAuth0();
    const [tenancies, setTenancies] = useState([]);
    const [selectedTenancy, setSelectedTenancy] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [canAccessOC, setCanAccessOC] = useState(false);

    useEffect(() => {
        getTenancies();
    }, [getAccessTokenWithPopup]);

    useEffect(() => {
        validatePermissions();
    }, [selectedTenancy]);

    const getTenancies = async () => {
        setIsLoading(true);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            // Get the data
            const response = await fetch('https://api.idsimplify.co.uk/users/me/tenancies', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            setTenancies(await response.json());
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const validatePermissions = () => {
        if (selectedTenancy === null) {
            setCanAccessOC(false);
            return;
        }

        if (selectedTenancy.permissions.includes("role|2f6389a6-5c53-4be1-8db7-1f991e56ab5d")) { setCanAccessOC(true); }
    };

    const selectedTenancyHandler = (tenancy) => { setSelectedTenancy(tenancy); };

    return (
        <LayoutAuthed>
            <LayoutInner
                className={classes.inner}
            >
                <span>Welcome to</span>
                <h1>iDSimplify</h1>

                {
                    isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        tenancies.length === 0 ? (
                            <>
                                <p>You are not currently a member of any tenacies. Please ask your admin to add you to the tenacy or create a new one below.</p>
                                <Link to='/join'>Register a New Tenancy</Link>
                            </>
                        ) : (
                            <>
                                <p>Please select the tenacy to work with?</p>
                                <Dropdown
                                    title='Tenancy: '
                                    data={tenancies}
                                    onSelected={selectedTenancyHandler}
                                />

                                <p>Please select what you would like to do?</p>

                                <ul>
                                    {canAccessOC && <li><Link to='/oc'>Organisation Center</Link></li>}
                                    <li><Link to='/control'>Control</Link></li>
                                    <li><Link to='/pp'>Partner Portal</Link></li>
                                </ul>
                            </>
                        )
                    )
                }

            </LayoutInner>
        </LayoutAuthed>
    );
};

export default AuthLandingPage;