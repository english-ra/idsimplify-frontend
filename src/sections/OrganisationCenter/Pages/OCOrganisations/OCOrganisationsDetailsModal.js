// OCOrganisationsDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 05.03.2023

import { Outlet, useParams } from "react-router-dom";

import HorizontalNavMenu from "../../../../components/HorizontalNavMenu";
import SideModal from "../../../../components/layout/SideModal";
import SideModalTable from "../../../../components/Table/Tables/SideModalTable";

import classes from './OCOrganisationsDetailsModal.module.css';

const menuLinks = [
    { id: 0, text: 'Details', link: 'details' },
    { id: 1, text: 'Integrations', link: 'integrations' },
    { id: 2, text: 'Users', link: 'users' }
];

const integrationTableColumns = [{ id: 0, friendlyTitle: 'Integration', dataKey: 'integration' }];
const usersTableColumns = [{ id: 0, friendlyTitle: 'Name', dataKey: 'name' }, { id: 1, friendlyTitle: 'Address', dataKey: 'address' }];

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const OCOrganisationsDetailsModal = (props) => {
    const params = useParams();

    return (
        <SideModal
            className={classes.root}
        >
            <h1>Organisation Name</h1>
            <p>{params.orgId}</p>

            <HorizontalNavMenu
                className={classes.navMenu}
                data={menuLinks}
            />

            <Outlet />

            <SideModalTable
                className={classes.table}
                headings={integrationTableColumns}
            />

            <SideModalTable
                className={classes.table}
                headings={usersTableColumns}
            />
        </SideModal>
    );
};

export default OCOrganisationsDetailsModal;