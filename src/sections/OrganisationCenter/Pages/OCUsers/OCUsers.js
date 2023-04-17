// OCUsers.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';

import classes from './OCUsers.module.css';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserTableColumns = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'name'
    },
    {
        id: 1,
        friendlyTitle: 'Nickname',
        dataKey: 'nickname'
    },
    {
        id: 2,
        friendlyTitle: 'Email',
        dataKey: 'email'
    }
];

const OCUsers = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { getAccessTokenWithPopup } = useAuth0();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getData();
    },[]);

    const getData = async () => {
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
            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setUsers([...data]);
            }
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const addUserButtonHandler = () => {
        navigate('create');
    };

    const rowClickHandler = (userID) => { navigate(`${userID}`); };

    return (
        <>
            <div className={classes.titleDiv}>
                <h1>Users</h1>
                <CircularButton
                    text='+'
                    onClick={addUserButtonHandler}
                />
            </div>

            <Table
                className={classes.table}
                headings={UserTableColumns}
            >
                {users.map(user => (<TableRow cols={UserTableColumns} data={user} onClick={rowClickHandler} />))}
            </Table>

            <p>{users.length} users found. Users in grey are pending.</p>

            <Outlet />
        </>
    );
};

export default OCUsers;