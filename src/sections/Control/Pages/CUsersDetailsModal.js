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
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TableRow from '../../../components/Table/Rows/TableRow';

const UserOrgPermissionsTableCols = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'displayName'
    },
    {
        id: 1,
        friendlyTitle: 'Visibility',
        dataKey: 'visibility'
    }
];

const CUsersDetailsModal = (props) => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getAccessTokenWithPopup } = useAuth0();

    useEffect(() => {
        getData();
    }, [params]);

    const getData = async () => {

        // Get the users ID
        const userID = params.userId;

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
            const [userResponse, groupsResponse] = await Promise.all([
                fetch(`https://api.idsimplify.co.uk/integrations/users/${userID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }),
                fetch(`https://api.idsimplify.co.uk/integrations/users/${userID}/groups`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            ]);

            const userData = await userResponse.json();
            setUser(userData);

            const groupsData = await groupsResponse.json();
            setGroups([...groupsData.value]);
        }
        catch (err) {
            console.log(err);
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
                        <h1>{user && user.displayName}</h1>
                        <p>{user && user.mail}</p>

                        <button>Reset Password</button>
                        <button>Block Sign in</button>

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
                            {
                                groups.map(group => (
                                    <TableRow
                                        cols={UserOrgPermissionsTableCols}
                                        data={group}
                                    />
                                ))
                            }
                        </SideModalTable>
                        <p>{groups.length} groups found</p>
                    </>
                )
            }
        </SideModal>
    );
};

export default CUsersDetailsModal;