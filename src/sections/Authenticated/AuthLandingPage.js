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
    const [error, setError] = useState(null);
    const [canAccessOC, setCanAccessOC] = useState(false);

    useEffect(() => {
        getTenancies();
    }, [getAccessTokenWithPopup]);

    useEffect(() => {
        validatePermissions();
    }, [selectedTenancy]);

    const getTenancies = async () => {
        setIsLoading(true);
        setError(null);
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

            if (response.status != 200) { throw new Error('Error whilst fetching tenancies. Please try again.'); }

            setTenancies(await response.json());
        }
        catch (error) {
            console.log(error);
            setError(error.message);
        }
        setIsLoading(false);
    };

    const validatePermissions = () => {
        console.log(selectedTenancy);
        if (selectedTenancy === null) {
            // setCanAccessOC(false);
            return;
        }

        // Check whether the user has permission to access Organisation Center
        if (selectedTenancy.permissions.includes('iD-P-1')) { setCanAccessOC(true); }
        else { setCanAccessOC(false); }
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
                                <p>You are not currently a member of any tenancies. Please ask your admin to add you to the tenacy or create a new one below.</p>
                                <p>You can view your tenancy invitations <Link to='/profile'>here</Link></p>
                            </>
                        ) : (
                            <>
                                <p>Please select the tenacy to work with?</p>
                                <Dropdown
                                    className={classes.tenancyDropdown}
                                    title='Tenancy: '
                                    data={tenancies}
                                    onSelected={selectedTenancyHandler}
                                />

                                <p>Please select what you would like to do?</p>

                                {
                                    selectedTenancy != null && (
                                        <ul className={classes.nav}>
                                            {canAccessOC && <li><Link to={`/oc/${selectedTenancy.id}/users`} className={classes.ocLink}>Organisation Center</Link></li>}
                                            <li><Link to={`/control/${selectedTenancy.id}/users`} className={classes.cLink}>Control</Link></li>
                                            <li><Link to={`/pp/${selectedTenancy.id}`} className={classes.ppLink}>Partner Portal</Link></li>
                                        </ul>
                                    )
                                }
                            </>
                        )
                    )
                }
                <Link to='/join'>Register a New Tenancy</Link>

                {!isLoading && error && <p>{error}</p>}
            </LayoutInner>
        </LayoutAuthed>
    );
};

export default AuthLandingPage;