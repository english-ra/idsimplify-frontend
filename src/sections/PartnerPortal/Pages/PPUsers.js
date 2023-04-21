// PPUsers.js
// iDSimplify Frontend
// Created by Reece English on 21.04.2023

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TableRow from '../../../components/Table/Rows/TableRow';
import Table from '../../../components/Table/Tables/Table';
import classes from './PPUsers.module.css';
import CircularButton from '../../../components/Buttons/CircularButton';

const UserTableColumns = [
    {
        id: 0,
        friendlyTitle: 'First Name',
        dataKey: 'givenName'
    },
    {
        id: 1,
        friendlyTitle: 'Last Name',
        dataKey: 'surname'
    },
    {
        id: 2,
        friendlyTitle: 'Display Name',
        dataKey: 'displayName'
    },
    {
        id: 3,
        friendlyTitle: 'UPN',
        dataKey: 'userPrincipalName'
    },
    {
        id: 4,
        friendlyTitle: 'Job Title',
        dataKey: 'jobTitle'
    }
];

const PPUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
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

            <Table
                className={classes.table}
                headings={UserTableColumns}
            >
                {
                    users.map(user => (
                        <TableRow
                            cols={UserTableColumns}
                            data={user}
                            key={user.id}
                            onClick={rowClickHandler}
                        />
                    ))
                }
            </Table>

            {isLoading && <p>Loading...</p>}
            {!isLoading && !error && <p>{users.length} users found</p>}
            {!isLoading && error && <p className='errorText'>{error.message}</p>}

            <Outlet />
        </>
    );
};

export default PPUsers;