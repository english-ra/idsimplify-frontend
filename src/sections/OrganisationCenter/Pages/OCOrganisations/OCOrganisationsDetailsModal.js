// OCOrganisationsDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 05.03.2023

import { Outlet, useParams } from "react-router-dom";

import SideModal from "../../../../components/layout/SideModal";
import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';

import classes from './OCOrganisationsDetailsModal.module.css';
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const integrationTableColumns = [
    { id: 0, friendlyTitle: 'Integration', dataKey: 'name' },
    { id: 2, friendlyTitle: 'Type', dataKey: 'type' }
];
const usersTableColumns = [{ id: 0, friendlyTitle: 'Name', dataKey: 'name' }, { id: 1, friendlyTitle: 'Address', dataKey: 'address' }];

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const OCOrganisationsDetailsModal = (props) => {
    const { getAccessTokenWithPopup } = useAuth0();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [organisation, setOrganisation] = useState(null);
    const [integrations, setIntegrations] = useState([]);

    useEffect(() => {
        getData();
    }, [params]);

    const getData = async () => {
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
            const [organisationResponse, integrationsResponse] = await Promise.all([
                fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations/${params.organisationId}`, {
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

            const organisationData = await organisationResponse.json();
            setOrganisation(organisationData);

            const integrationsData = await integrationsResponse.json();
            console.log(integrationsData);
            setIntegrations(integrationsData);
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
                        <h1>{organisation && organisation.name}</h1>

                        <div className={classes.subTitleDiv}>
                            <h3>Users</h3>
                            <CircularButton
                                text='+'
                            />
                        </div>

                        <Table
                            className={classes.table}
                            headings={usersTableColumns}
                        />
                        <p className={classes.tableFooter}>0 Users found</p>

                        <div className={classes.subTitleDiv}>
                            <h3>Integrations</h3>
                            <CircularButton
                                text='+'
                            />
                        </div>

                        <Table
                            className={classes.table}
                            headings={integrationTableColumns}
                        >
                            {integrations.map(integration => (<TableRow cols={integrationTableColumns} data={integration} />))}
                        </Table>
                        <p className={classes.tableFooter}>0 Integrations found</p>
                    </>
                )
            }
        </SideModal>
    );
};

export default OCOrganisationsDetailsModal;