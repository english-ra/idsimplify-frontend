// PPUsers.js
// iDSimplify Frontend
// Created by Reece English on 21.04.2023

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TableRow from '../../../components/Table/Rows/TableRow';
import Table from '../../../components/Table/Tables/Table';
import Dropdown from '../../../components/Select/Dropdown';
import InputLabel from '../../../components/InputFields/InputLabel';
import classes from './PPUsers.module.css';
import CircularButton from '../../../components/Buttons/CircularButton';
import PPUserCard from '../PPUserCard';


const PPUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [organisations, setOrganisations] = useState([]);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getUsersOrganisations()
        getUsersFromIntegration();
    }, [searchParams]);

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

    const getUsersFromIntegration = async () => {
        setIsLoading(true);
        setError(null);
        setUsers([]);

        const tenancyID = searchParams.get('tenancy-id');
        const organisationID = searchParams.get('organisation-id');

        try {
            if (tenancyID === null || organisationID === null) { throw new Error('Please select an organisation'); }

            const accessToken = await getAccessToken();

            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/integrations/users?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setUsers([...data.value]);
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
        if (!organisation) { setSearchParams({ 'tenancy-id': searchParams.get('tenancy-id') }); }
        else { setSearchParams({ 'tenancy-id': searchParams.get('tenancy-id'), 'organisation-id': organisation.id }); }
    };

    const rowClickHandler = (user) => { navigate(`${user.id}`); };
    const createUserButtonHandler = () => { navigate(`create${location.search}`); };

    return (
        <>
            <div className={classes.titleDiv}>
                <h1>Users</h1>
                <CircularButton
                    text='+'
                    onClick={createUserButtonHandler}
                />
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

            <div className={classes.users}>
                {
                    users.map((user) => (
                        <PPUserCard
                            key={user.id}
                            data={user}
                        />
                    ))
                }
            </div>

            {isLoading && <p>Loading...</p>}
            {!isLoading && !error && <p>{users.length} users found</p>}
            {!isLoading && error && <p className='errorText'>{error.message}</p>}

            <Outlet />
        </>
    );
};

export default PPUsers;