// OCOrganisations.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import { Outlet, useNavigate } from "react-router-dom";
import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';

import classes from './OCOrganisations.module.css';
import { useState } from "react";

const OrgTableColumns = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'name'
    }
];

const OCOrganisations = (props) => {
    const [organisations, setOrganisations] = useState([]);

    const navigate = useNavigate();

    const rowClickHandler = (organisationID) => { navigate(`${organisationID}`); };
    const createOrganisationButtonHandler = () => { navigate('create'); };

    return (
        <>
            <div className={classes.titleDiv}>
                <h1>Organisations</h1>
                <CircularButton
                    text='+'
                    onClick={createOrganisationButtonHandler}
                />
            </div>

            <Table
                className={classes.table}
                headings={OrgTableColumns}
            >
                {organisations.map(organisation => (<TableRow cols={OrgTableColumns} data={organisation} />))}
            </Table>

            <Outlet />
        </>
    );
};

export default OCOrganisations;