// CUsers.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import { useEffect, useState } from 'react';
import TableRow from '../../../components/Table/Rows/TableRow';
import Table from '../../../components/Table/Tables/Table';
import classes from './CUsers.module.css';

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
        friendlyTitle: 'Email',
        dataKey: 'mail'
    },
    {
        id: 4,
        friendlyTitle: 'Job Title',
        dataKey: 'jobTitle'
    }
];

const CUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUsersFromIntegration();
    }, []);

    const getUsersFromIntegration = async () => {
        setIsLoading(true);
        try {
            // Get the users access token
            // const accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
            //     authorizationParams: {
            //         audience: 'https://api.idsimplify.co.uk',
            //         scope: 'access'
            //     }
            // });

            // Get the data
            const response = await fetch('https://api.idsimplify.co.uk/integrations/users', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            const usersData = [...data.value];
            setUsers(usersData);
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <>
            <h1>Users</h1>

            <Table
                className={classes.table}
                headings={UserTableColumns}
            >
                {
                    isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        users.length === 0 ? (
                            <p>No users found</p>
                        ) : (
                            users.map(user => (<TableRow cols={UserTableColumns} data={user} />))
                        )
                    )
                }
            </Table>
            <p>{users.length} users found</p>
        </>
    );
};

export default CUsers;