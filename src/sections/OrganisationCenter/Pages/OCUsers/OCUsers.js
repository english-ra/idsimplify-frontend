// OCUsers.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";

import classes from './OCUsers.module.css';
import OCUsersDetailsModal from "./OCUsersDetailsModal";
import { Outlet } from "react-router-dom";

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

    let userData = [
        {
            id: 0,
            fName: "Reece",
            lName: "English",
            username: "englishra",
            email: "reece@idsimplify.co.uk"
        },
        {
            id: 1,
            fName: "Reece",
            lName: "English",
            username: "englishra",
            email: "reece@idsimplify.co.uk"
        },
        {
            id: 2,
            fName: "Reece",
            lName: "English",
            username: "englishra",
            email: "reece@idsimplify.co.uk"
        }
    ];

    let sampleOrgData = ['The Hotel Ltd', 'Big Business Ltd'];

    return (
        <>
            <h1>Users</h1>

            <Table
                className={classes.table}
                headings={UserTableColumns}
            >
                {userData.map(user => (<TableRow cols={UserTableColumns} data={user} />))}
            </Table>

            <Outlet />
        </>
    );
};

export default OCUsers;