// CGroups.js
// iDSimplify Frontend
// Created by Reece English on 23.04.2023

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TableRow from '../../../components/Table/Rows/TableRow';
import Table from '../../../components/Table/Tables/Table';
import classes from './CGroups.module.css';
import CircularButton from '../../../components/Buttons/CircularButton';

const GroupTableColumns = [
    {
        id: 0,
        friendlyTitle: 'Display Name',
        dataKey: 'displayName'
    },
    {
        id: 1,
        friendlyTitle: 'Mail',
        dataKey: 'mail'
    },
    {
        id: 2,
        friendlyTitle: 'Description',
        dataKey: 'description'
    },
    {
        id: 3,
        friendlyTitle: 'Types',
        dataKey: 'groupTypes'
    }
];

const CGroups = (props) => {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getGroupsFromIntegration();
    }, [searchParams]);

    useEffect(() => {
        if (location.pathname === '/control/groups') { getGroupsFromIntegration(); }
    }, [location]);

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

    const getGroupsFromIntegration = async () => {
        setIsLoading(true);
        setError(null);
        setGroups([]);

        const tenancyID = searchParams.get('tenancy-id');
        const organisationID = searchParams.get('organisation-id');

        try {
            if (tenancyID === null || organisationID === null) { throw new Error('Please select an organisation'); }

            const accessToken = await getAccessToken();

            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/integrations/groups?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setGroups([...data.value]);
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

    const rowClickHandler = (user) => { navigate(`${user.id}${location.search}`); };
    const createUserButtonHandler = () => { navigate(`create${location.search}`); };

    return (
        <>
            <div className={classes.titleDiv}>
                <h1>Groups</h1>
                <CircularButton
                    text='+'
                    onClick={createUserButtonHandler}
                />
            </div>

            <Table
                className={classes.table}
                headings={GroupTableColumns}
            >
                {
                    groups.map(user => (
                        <TableRow
                            cols={GroupTableColumns}
                            data={user}
                            key={user.id}
                            onClick={rowClickHandler}
                        />
                    ))
                }
            </Table>

            {isLoading && <p>Loading...</p>}
            {!isLoading && !error && <p>{groups.length} groups found</p>}
            {!isLoading && error && <p className='errorText'>{error.message}</p>}

            <Outlet />
        </>
    );
};

export default CGroups;