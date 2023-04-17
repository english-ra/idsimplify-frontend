// OCUsers.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';

import classes from './OCUsers.module.css';
import { Outlet, useNavigate } from "react-router-dom";

const UserTableColumns = [
    {
        id: 0,
        friendlyTitle: 'First Name',
        dataKey: 'fName'
    },
    {
        id: 1,
        friendlyTitle: 'Last Name',
        dataKey: 'lName'
    },
    {
        id: 2,
        friendlyTitle: 'Username',
        dataKey: 'username'
    },
    {
        id: 3,
        friendlyTitle: 'Email',
        dataKey: 'email'
    }
];

const OCUsers = (props) => {
    const navigate = useNavigate();

    const addUserButtonHandler = () => {
        navigate('create');
    };

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
                {/* {userData.map(user => (<TableRow cols={UserTableColumns} data={user} />))} */}
            </Table>

            <Outlet />
        </>
    );
};

export default OCUsers;