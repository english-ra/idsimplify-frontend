// OCOrganisationsUserAddModal.js
// iDSimplify Frontend
// Created by Reece English on 20.04.2023

import { Outlet, useNavigate, useParams } from "react-router-dom";

import PERMISSIONS from "../../../../Permissions";
import SideModal from "../../../../components/layout/SideModal";
import Table from "../../../../components/Table/Tables/Table";
import PrimaryFormButton from "../../../../components/Buttons/PrimaryFormButton";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';
import InputLabel from '../../../../components/InputFields/InputLabel';
import InputSubmitButton from '../../../../components/InputFields/InputSubmitButton';
import InputTextField from '../../../../components/InputFields/InputTextField';

import classes from './OCOrganisationsUserAddModal.module.css';
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TableRowSelectable from "../../../../components/Table/Rows/TableRowSelectable";

const integrationTableColumns = [
    { id: 0, friendlyTitle: 'Name', dataKey: 'name' },
    { id: 2, friendlyTitle: 'Type', dataKey: 'type' }
];
const usersTableColumns = [{ id: 0, friendlyTitle: 'Name', dataKey: 'name' }, { id: 1, friendlyTitle: 'Email', dataKey: 'email' }];
const permissionTableColumns = [{ id: 0, friendlyTitle: 'Name', dataKey: 'name' }, { id: 1, friendlyTitle: 'Description', dataKey: 'description' }];


const OCOrganisationsUserAddModal = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [permissions, setPermissions] = useState([...PERMISSIONS.organisation]);

    useEffect(() => {
        getData();
    }, [params]);

    const getData = async () => {
        setIsLoading(true);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
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

            const data = await response.json();

            if (response.status === 200) {
                setUsers(data);
                console.log(data);
            }
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const userSelectedUser = (user) => {
        setSelectedUser(user);
    };

    const permissionSelectedHandler = (permission) => {
        const tempPermissions = [...permissions];
        tempPermissions.find((p) => { return p.id = permission.id }).selected = !permission.selected;
        setPermissions(tempPermissions);
    };

    const addButtonHandler = async () => {
        setError(null);

        // Check the user is selected
        if (selectedUser === null || selectedUser === undefined) { setError(new Error('Please select a user')); return; }

        // Check permissions are selected
        const selectedPermissions = permissions.filter((permission) => {return permission.selected});
        if (selectedPermissions.length === 0) { setError(new Error('Please select a permission')); return; }

        // Send the request
        setIsLoading(true);

        // Create the request body
        const body = {
            id: selectedUser.id,
            permissions: selectedPermissions
        };

        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({authorizationParams: {audience: 'https://api.idsimplify.co.uk',scope: 'access'}});

            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                // Navigate back to the users page
                navigate('..');
            } else {
                // An error has occurred
                
            }
        }
        catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    return (
        <SideModal
            className={classes.root}
        >
            {
                isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h1>Add a User</h1>
                        <p>Please select a user below to assign permissions to access this organisation.</p>

                        <Table
                            className={classes.table}
                            headings={usersTableColumns}
                        >
                            {users.map((user) => (<TableRow key={user.id} cols={usersTableColumns} data={user} onClick={userSelectedUser} />))}
                        </Table>
                        <p className={classes.tableFooter}>{users.length} Users found</p>

                        {selectedUser && <p>Selected user: {selectedUser.name} ({selectedUser.email})</p>}

                        <h3>Assign Permissions</h3>
                        <Table
                            className={classes.table}
                            headings={permissionTableColumns}
                        >
                            {permissions.map((permission) => (<TableRowSelectable key={permission.id} cols={permissionTableColumns} data={permission} onClick={permissionSelectedHandler} />))}
                        </Table>

                        { error && <p className="errorText">{error.message}</p> }

                        <PrimaryFormButton className={classes.submitButton} onClick={addButtonHandler} >Add</PrimaryFormButton>
                    </>
                )
            }
        </SideModal>
    );
};

export default OCOrganisationsUserAddModal;