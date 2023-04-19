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
    const [error, setError] = useState(null);
    const [selectedOrganisation, setSelectedOrganisation] = useState(null);
    const { getAccessTokenWithPopup } = useAuth0();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (selectedOrganisation != null) {
            getUsersFromIntegration();
        } else {
            setUsers([]);
        }
    }, [selectedOrganisation]);

    const getData = async () => {
        getUsersOrganisations();
    };


    const getAccessToken = async () => {
        var accessToken = '';
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
        return accessToken;
    };

    const getUsersOrganisations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();

            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/users/me/tenancies/${params.tenancyId}/organisations`, {
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

        const tenancyID = params.tenancyId;
        const organisationID = selectedOrganisation.id;

        try {
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

    const rowClickHandler = (userID) => { navigate(`${userID}`); };
    const createUserButtonHandler = () => { navigate('create'); };
    const organisationChangeHandler = (organisation) => { setSelectedOrganisation(organisation); };

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
                onSelected={organisationChangeHandler}
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

            { isLoading && <p>Loading...</p> }
            { !isLoading && selectedOrganisation && <p>{users.length} users found</p> }
            { !isLoading && !selectedOrganisation && <p>Please select an organisation</p> }
            { !isLoading && error && <p className='errorText'>{error.message}</p> }

            <Outlet />
        </>
    );
};

export default CUsers;