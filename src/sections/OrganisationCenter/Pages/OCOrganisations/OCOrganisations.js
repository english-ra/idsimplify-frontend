// OCOrganisations.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import { Outlet } from "react-router-dom";
import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';

import classes from './OCOrganisations.module.css';

const OrgTableColumns = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'name'
    }
];

const OCOrganisations = (props) => {

    let orgData = [
        {
            id: 0,
            name: 'The Big Hotel Ltd'
        }
    ];

    return (
        <>
            <div className={classes.titleDiv}>
                <h1>Organisations</h1>
                <CircularButton
                    text='+'
                    // onClick={createUserButtonHandler}
                />
            </div>

            <Table
                className={classes.table}
                headings={OrgTableColumns}
            >
                {orgData.map(org => (<TableRow cols={OrgTableColumns} data={org} />))}
            </Table>

            <Outlet />
        </>
    );
};

export default OCOrganisations;