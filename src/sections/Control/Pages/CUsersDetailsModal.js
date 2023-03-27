// CUsersDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 27.03.2023

import { useParams } from 'react-router-dom';

import InputLabel from '../../../components/InputFields/InputLabel';
import TextFieldWLabel from '../../../components/InputFields/TextFieldWLabel';
import OrgPermissionTableRow from '../../../components/Table/Rows/OrgPermissionTableRow';
import SideModalTable from '../../../components/Table/Tables/SideModalTable';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import SideModal from '../../../components/layout/SideModal';
import classes from './CUsersDetailsModal.module.css';

const UserOrgPermissionsTableCols = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'orgName'
    },
    {
        id: 1,
        friendlyTitle: 'Control',
        dataKey: 'control'
    },
    {
        id: 2,
        friendlyTitle: 'Partner Portal',
        dataKey: 'pp'
    }
];

const CUsersDetailsModal = (props) => {
    const params = useParams();

    const closeButtonHandler = () => {};

    return (
        <SideModal
            className={classes.root}
        >
            <h1>Users Name</h1>
            <p>{params.userId}</p>

            <h3>User Details</h3>

            <form
                className={classes.form}
            >
                <TextFieldWLabel
                    id='fName'
                    labelText='First name'
                />
                <TextFieldWLabel
                    id='lName'
                    labelText='Last name'
                />
                <TextFieldWLabel
                    id='email'
                    labelText='Email address'
                />
            </form>

            <h3>Groups</h3>

            <SideModalTable
                className={classes.groupsTable}
                headings={UserOrgPermissionsTableCols}
            >
                <OrgPermissionTableRow />
                <OrgPermissionTableRow />
            </SideModalTable>
        </SideModal>
    );
};

export default CUsersDetailsModal;