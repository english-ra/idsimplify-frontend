// CUsersCreateModal.js
// iDSimplify Frontend
// Created by Reece English on 10.04.2023

import InputLabel from '../../../components/InputFields/InputLabel';
import TextFieldWLabel from '../../../components/InputFields/TextFieldWLabel';
import SideModal from '../../../components/layout/SideModal';
import classes from './CUsersCreateModal.module.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Dropdown from '../../../components/Select/Dropdown';
import InputSubmitButton from '../../../components/InputFields/InputSubmitButton';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const UserOrgPermissionsTableCols = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'displayName'
    }
];

const CUsersCreateModal = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [domains, setDomains] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [domain, setDomain] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getDomains();
    }, []);

    const getDomains = async () => {
        setIsLoading(true);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const tenancyID = searchParams.get('tenancy-id');
            const organisationID = searchParams.get('organisation-id');

            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/integrations/domains?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();
            setDomains([...data.value]);
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const firstNameTextFieldHandler = (event) => { setFirstName(event.target.value); };
    const lastNameTextFieldHandler = (event) => { setLastName(event.target.value); };
    const displayNameTextFieldHandler = (event) => { setDisplayName(event.target.value); };
    const usernameTextFieldHandler = (event) => { setUsername(event.target.value); };
    const domainsDropdownHandler = (selectedDomain) => { setDomain(selectedDomain && selectedDomain.id); };
    const passwordTextFieldHandler = (event) => { setPassword(event.target.value); };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const user = {
            givenName: firstName,
            surname: lastName,
            displayName: displayName,
            mailNickname: username,
            userPrincipalName: `${username}@${domain}`,
            password: password
        };

        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const tenancyID = searchParams.get('tenancy-id');
            const organisationID = searchParams.get('organisation-id');

            const response = await fetch(`https://api.idsimplify.co.uk/integrations/users?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                // Navigate back to the users page
                navigate(`..${location.search}`);
            } else {
                // An error has occurred

            }
        }
        catch (e) {
            console.log(e);
        }
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
                        <h1>Create a User</h1>

                        <h3>User Details</h3>

                        <form
                            className={classes.form}
                            onSubmit={onSubmitHandler}
                        >
                            <TextFieldWLabel
                                id='firstName'
                                labelText='First name'
                                onChange={firstNameTextFieldHandler}
                            />
                            <TextFieldWLabel
                                id='lastName'
                                labelText='Last name'
                                onChange={lastNameTextFieldHandler}
                            />
                            <TextFieldWLabel
                                id='displayName'
                                labelText='Display Name'
                                onChange={displayNameTextFieldHandler}
                            />
                            <TextFieldWLabel
                                id='username'
                                labelText='Username'
                                onChange={usernameTextFieldHandler}
                            />
                            <InputLabel
                                for='domain'
                            >
                                Domain
                            </InputLabel>
                            <Dropdown
                                id='domain'
                                data={domains}
                                dataKey='id'
                                onSelected={domainsDropdownHandler}
                            />
                            <TextFieldWLabel
                                id='password'
                                labelText='Password'
                                type='password'
                                onChange={passwordTextFieldHandler}
                            />

                            <InputSubmitButton value='Create' />
                        </form>
                    </>
                )
            }
        </SideModal>
    );
};

export default CUsersCreateModal;