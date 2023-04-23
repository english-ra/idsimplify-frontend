// OCOrganisationsDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 05.03.2023

import { Outlet, useNavigate, useParams } from "react-router-dom";

import SideModal from "../../../../components/layout/SideModal";
import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';
import PrimaryFormButton from '../../../../components/Buttons/PrimaryFormButton';

import classes from './OCOrganisationsDetailsModal.module.css';
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const usersTableColumns = [
    { id: 0, friendlyTitle: 'Name', dataKey: 'name' },
    { id: 1, friendlyTitle: 'Permissions', dataKey: 'permissions' }
];
const integrationTableColumns = [
    { id: 0, friendlyTitle: 'Name', dataKey: 'name' },
    { id: 2, friendlyTitle: 'Type', dataKey: 'type' }
];


const OCOrganisationsDetailsModal = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [organisation, setOrganisation] = useState(null);
    const [users, setUsers] = useState([]);
    const [integrations, setIntegrations] = useState([]);

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
            const [organisationResponse, usersResponse, integrationsResponse] = await Promise.all([
                fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations/${params.organisationId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }),
                fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations/${params.organisationId}/users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }),
                fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations/${params.organisationId}/integrations`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            ]);

            if (organisationResponse.status === 200) {
                const organisationData = await organisationResponse.json();
                setOrganisation(organisationData);
            }

            if (usersResponse.status === 200) {
                const usersData = await usersResponse.json();
                setUsers(usersData);
            }

            if (integrationsResponse.status === 200) {
                const integrationsData = await integrationsResponse.json();
                setIntegrations(integrationsData);
            }
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const deleteButtonHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations/${params.organisationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                navigate('..');
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

    const addUserHandler = () => { navigate('users/add'); };
    const createIntegrationHandler = () => { navigate('integrations/create'); };

    const integrationDeleteHandler = async (integration) => {
        console.log(integration);
        setIsLoading(true);
        setError(null);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations/${params.organisationId}/integrations/${integration.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                navigate('..');
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
                        <h1>{organisation && organisation.name}</h1>

                        <PrimaryFormButton className={classes.deleteButton} onClick={deleteButtonHandler} >Delete</PrimaryFormButton>

                        <div className={classes.subTitleDiv}>
                            <h3>Users</h3>
                            <CircularButton
                                text='+'
                                onClick={addUserHandler}
                            />
                        </div>

                        <Table
                            className={classes.table}
                            headings={usersTableColumns}
                        >
                            {users.map(user => (<TableRow key={user.id} cols={usersTableColumns} data={user} />))}
                        </Table>
                        <p className={classes.tableFooter}>{users.length} Users found</p>

                        <div className={classes.subTitleDiv}>
                            <h3>Integrations</h3>
                            <CircularButton
                                text='+'
                                onClick={createIntegrationHandler}
                            />
                        </div>

                        <Table
                            className={classes.table}
                            headings={integrationTableColumns}
                        >
                            {integrations.map(integration => (<TableRow key={integration.id} cols={integrationTableColumns} data={integration} onClick={integrationDeleteHandler} />))}
                        </Table>
                        <p className={classes.tableFooter}>{integrations.length} Integrations found</p>

                        <p>Please click on either a user or integration to remove them from this organisation.</p>
                    </>
                )
            }

            {error && <p className='errorText'>{error.message}</p>}
        </SideModal>
    );
};

export default OCOrganisationsDetailsModal;