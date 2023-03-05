// OCUsersDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import { useParams } from 'react-router-dom';

import InputLabel from '../../../components/InputFields/InputLabel';
import TextFieldWLabel from '../../../components/InputFields/TextFieldWLabel';
import OrgPermissionTableRow from '../../../components/Table/Rows/OrgPermissionTableRow';
import SideModalTable from '../../../components/Table/Tables/SideModalTable';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import { UserOrgPermissionsTableCols } from '../Data/UserOrgPermissionsTableCols';
import SideModal from '../../../components/layout/SideModal';
import classes from './OCUsersDetailsModal.module.css';

const OCUsersDetailsModal = (props) => {
    const params = useParams();

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

            <h3>Organisation Center Permissions (Administrator)</h3>
            <InputLabel>Organisation Center Access: </InputLabel>
            <ToggleSwitch />

            <h3>Organisation Permissions</h3>

            <SideModalTable
                className={classes.orgPermissionsTable}
                headings={UserOrgPermissionsTableCols}
            >
                <OrgPermissionTableRow />
                <OrgPermissionTableRow />
            </SideModalTable>
        </SideModal>
    );
};

export default OCUsersDetailsModal;