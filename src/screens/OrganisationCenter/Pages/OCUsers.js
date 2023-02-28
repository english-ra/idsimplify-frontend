// OCUsers.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import { UserTableColumns } from "../Data/UserTableColumns";

import classes from './OCUsers.module.css';

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

            <Table className={classes.table} headings={UserTableColumns}>
                <tbody>
                    {userData.map(user => (<TableRow cols={UserTableColumns} data={user} />))}
                </tbody>
            </Table>
        </>
    );
};

export default OCUsers;