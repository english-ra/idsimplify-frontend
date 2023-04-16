// CUsers.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import TableRow from '../../../components/Table/Rows/TableRow';
import Table from '../../../components/Table/Tables/Table';
import classes from './CUsers.module.css';
import CircularButton from '../../../components/Buttons/CircularButton';
import Dropdown from '../../../components/Select/Dropdown';
import InputLabel from '../../../components/InputFields/InputLabel';

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

const CUsers = (props) => {
    const [organisations, setOrganisations] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getAccessTokenWithPopup } = useAuth0();
    const navigate = useNavigate();
    const params = useParams();

    var accessToken;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await getAccessToken();
        getUsersOrganisations();
        getUsersFromIntegration();
    };


    const getAccessToken = async () => {
        try {
            // Get the users access token
            accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    const getUsersOrganisations = async () => {
        setIsLoading(true);
        try {
            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/users/me/tenancies/${params.tenancyId}/organisations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();
            console.log('Orgs');
            console.log(data);
            setOrganisations(data);
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const getUsersFromIntegration = async () => {
        setIsLoading(true);
        try {
            // Get the data
            const response = await fetch('https://api.idsimplify.co.uk/integrations/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();
            setUsers([...data.value]);
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const rowClickHandler = (userID) => { navigate(`${userID}`); };

    const createUserButtonHandler = () => { navigate('create'); };

    return (
        <>
            <div className={classes.titleDiv}>
                <h1>Users</h1>
                <CircularButton
                    text='+'
                    onClick={createUserButtonHandler}
                />
            </div>

            <InputLabel for='organisationDropdown' >Organisation:</InputLabel>
            <Dropdown
                id='organisationDropdown'
                className={classes.dropdown}
                data={organisations}
                dataKey='name'
            />

            <Table
                className={classes.table}
                headings={UserTableColumns}
            >
                {
                    users.map(user => (
                        <TableRow
                            cols={UserTableColumns}
                            data={user}
                            onClick={rowClickHandler}
                        />
                    ))
                }
            </Table>

            {
                isLoading ? (
                    <p>Loading...</p>
                ) : (
                    users.length === 0 ? (
                        <p>No users found</p>
                    ) : (
                        <p>{users.length} users found</p>
                    )
                )
            }

            <Outlet />
        </>
    );
};

export default CUsers;