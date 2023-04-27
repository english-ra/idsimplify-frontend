// CGroupsDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 23.04.2023

import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import InputLabel from '../../../components/InputFields/InputLabel';
import TextFieldWLabel from '../../../components/InputFields/TextFieldWLabel';
import OrgPermissionTableRow from '../../../components/Table/Rows/OrgPermissionTableRow';
import SideModalTable from '../../../components/Table/Tables/SideModalTable';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import SideModal from '../../../components/layout/SideModal';
import classes from './CGroupsDetailsModal.module.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TableRow from '../../../components/Table/Rows/TableRow';

const MembersTableCols = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'displayName'
    }
];

const CGroupsDetailsModal = (props) => {
    const params = useParams();
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);
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
        const groupID = params.groupId;

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
            const [groupResponse, membersResponse] = await Promise.all([
                fetch(`https://api.idsimplify.co.uk/integrations/groups/${groupID}?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }),
                fetch(`https://api.idsimplify.co.uk/integrations/groups/${groupID}/members?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            ]);

            const groupData = await groupResponse.json();
            setGroup(groupData);

            const membersData = await membersResponse.json();
            setMembers([...membersData.value]);
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };


    const deleteGroupHandler = async () => {
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

            const response = await fetch(`https://api.idsimplify.co.uk/integrations/groups/${group.id}?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
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
                        <h1>{group && group.displayName}</h1>
                        <p>{group && group.mail}</p>

                        <button onClick={deleteGroupHandler}>Delete Group</button>

                        <h3>Members</h3>

                        <SideModalTable
                            className={classes.groupsTable}
                            headings={MembersTableCols}
                        >
                            {
                                members.map(group => (
                                    <TableRow
                                        cols={MembersTableCols}
                                        data={group}
                                    />
                                ))
                            }
                        </SideModalTable>
                        <p>{members.length} users found</p>
                    </>
                )
            }
        </SideModal>
    );
};

export default CGroupsDetailsModal;