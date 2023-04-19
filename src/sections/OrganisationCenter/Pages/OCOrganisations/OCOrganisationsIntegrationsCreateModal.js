// OCOrganisationsIntegrationsCreateModal.js
// iDSimplify Frontend
// Created by Reece English on 18.04.2023

import { Outlet, useNavigate, useParams } from "react-router-dom";

import SideModal from "../../../../components/layout/SideModal";
import TextFieldWLabel from '../../../../components/InputFields/TextFieldWLabel';
import InputSubmitButton from '../../../../components/InputFields/InputSubmitButton';

import classes from './OCOrganisationsIntegrationsCreateModal.module.css';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import InputLabel from "../../../../components/InputFields/InputLabel";
import Dropdown from "../../../../components/Select/Dropdown";

const integrationTypes = [{name: 'Microsoft Azure AD'}]

const OCOrganisationsIntegrationsCreateModal = (props) => {
    const params = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [tenantID, setTenantID] = useState('');
    const [clientID, setClientID] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        // Create the request body
        const body = {
            name: name,
            type: type,
            tenantID: tenantID,
            clientID: clientID,
            clientSecret: clientSecret
        };

        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations/${params.organisationId}/integrations`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            // Check the request was successfull
            if (response.status === 200) {
                // Navigate back to the users page
                navigate('..');
            } else {
                // An error has occurred
                throw new Error(data);
            }
        }
        catch (error) {
            console.log(error);
            setError(error);
        }
        setIsLoading(false);
    };

    const nameChangeHandler = (event) => { setName(event.target.value) };
    const typeChangeHandler = (type) => { setType(type.name); };
    const tenantIdChangeHandler = (event) => { setTenantID(event.target.value) };
    const clientIdChangeHandler = (event) => { setClientID(event.target.value) };
    const clientSecretChangeHandler = (event) => { setClientSecret(event.target.value) };

    return (
        <SideModal
            className={classes.root}
        >
            <h1>Link an Integration</h1>

            <form
                className={classes.form}
                onSubmit={onSubmitHandler}
            >
                <TextFieldWLabel
                    id='name'
                    labelText='Integration Name'
                    onChange={nameChangeHandler}
                />

                <InputLabel>Integration Type</InputLabel>
                <Dropdown
                    data={integrationTypes}
                    onSelected={typeChangeHandler}
                />

                <TextFieldWLabel
                    id='tenantId'
                    labelText='Tenant ID'
                    onChange={tenantIdChangeHandler}
                />

                <TextFieldWLabel
                    id='clientId'
                    labelText='Client ID'
                    onChange={clientIdChangeHandler}
                />

                <TextFieldWLabel
                    id='clientSecret'
                    labelText='Client Secret'
                    type='password'
                    onChange={clientSecretChangeHandler}
                />

                <InputSubmitButton value='Link' />
            </form>

            {isLoading && <p>Loading...</p>}
            {!isLoading && error && <p className='errorText'>{error.message}</p>}

        </SideModal>
    );
};

export default OCOrganisationsIntegrationsCreateModal;