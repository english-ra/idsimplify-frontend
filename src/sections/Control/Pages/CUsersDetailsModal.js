// CUsersDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 27.03.2023

import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getData();
    }, [params]);

    const getData = async () => {

        // Get the users ID
        const userID = params.userId;

        const tenancyID = searchParams.get('tenancy-id');
        const organisationID = searchParams.get('organisation-id');

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
            const [userResponse, groupsResponse] = await Promise.all([
                fetch(`https://api.idsimplify.co.uk/integrations/users/${userID}?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }),
                fetch(`https://api.idsimplify.co.uk/integrations/users/${userID}/groups?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            ]);

            const userData = await userResponse.json();
            console.log(userData);
            setUser(userData);

            const groupsData = await groupsResponse.json();
            setGroups([...groupsData.value]);
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };


    const blockEnableSignInHandler = async () => {
        setIsLoading(true);
        setError(null);

        const tenancyID = searchParams.get('tenancy-id');
        const organisationID = searchParams.get('organisation-id');

        if (user.accountEnabled) {
            try {
                // Get the users access token
                const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                    authorizationParams: {
                        audience: 'https://api.idsimplify.co.uk',
                        scope: 'access'
                    }
                });

                const response = await fetch(`https://api.idsimplify.co.uk/integrations/users/${user.id}/disable?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                // Check the request was successfull
                if (response.status === 200) {
                    navigate(`..${location.search}`);
                } else {
                    const data = await response.json();
                    throw new Error(data);
                }
            } catch (error) {
                console.log(error);
                setError(error);
            }
        } else {
            try {
                // Get the users access token
                const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                    authorizationParams: {
                        audience: 'https://api.idsimplify.co.uk',
                        scope: 'access'
                    }
                });

                const response = await fetch(`https://api.idsimplify.co.uk/integrations/users/${user.id}/enable?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                // Check the request was successfull
                if (response.status === 200) {
                    navigate(`..${location.search}`);
                } else {
                    const data = await response.json();
                    throw new Error(data);
                }
            } catch (error) {
                console.log(error);
                setError(error);
            }
        }
        setIsLoading(false);
    };


    const deleteUserHandler = async () => {
        setIsLoading(true);
        setError(null);

        const tenancyID = searchParams.get('tenancy-id');
        const organisationID = searchParams.get('organisation-id');

        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const response = await fetch(`https://api.idsimplify.co.uk/integrations/users/${user.id}?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                navigate(`..${location.search}`);
            } else {
                const data = await response.json();
                throw new Error(data);
            }
        } catch (error) {
            console.log(error);
            setError(error);
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
                        <p>{user && user.userPrincipalName}</p>

                        <button onClick={blockEnableSignInHandler}>{user && user.accountEnabled ? <span>Block Sign In</span> : <span>Enable Sign In</span>}</button>
                        <button onClick={deleteUserHandler}>Delete User</button>

                        {/* <h3>User Details</h3> */}

                        {/* <form
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
                        </form> */}

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