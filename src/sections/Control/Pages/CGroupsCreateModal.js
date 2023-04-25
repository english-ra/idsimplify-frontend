// CGroupsCreateModal.js
// iDSimplify Frontend
// Created by Reece English on 23.04.2023

import InputLabel from '../../../components/InputFields/InputLabel';
import TextFieldWLabel from '../../../components/InputFields/TextFieldWLabel';
import SideModal from '../../../components/layout/SideModal';
import classes from './CGroupsCreateModal.module.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import InputSubmitButton from '../../../components/InputFields/InputSubmitButton';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';


const CGroupsCreateModal = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [mailNickname, setMailNickname] = useState('');

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


    const displayNameTextFieldHandler = (event) => { setDisplayName(event.target.value); };
    const descriptionTextFieldHandler = (event) => { setDescription(event.target.value); };
    const mailNicknameTextFieldHandler = (event) => { setMailNickname(event.target.value); };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const group = {
            displayName: displayName,
            description: description,
            mailNickname: mailNickname
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

            const response = await fetch(`https://api.idsimplify.co.uk/integrations/groups?tenancy-id=${tenancyID}&organisation-id=${organisationID}`, {
                method: 'POST',
                body: JSON.stringify(group),
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
                const data = await response.json();
                throw new Error(data);
            }
        }
        catch (error) {
            console.log(error);
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <SideModal
            className={classes.root}
        >
            <h1>Create a Group</h1>

            <h3>Group Details</h3>

            <form
                className={classes.form}
                onSubmit={onSubmitHandler}
            >
                <TextFieldWLabel
                    id='displayName'
                    labelText='Display Name'
                    onChange={displayNameTextFieldHandler}
                />
                <TextFieldWLabel
                    id='description'
                    labelText='Description'
                    onChange={descriptionTextFieldHandler}
                />
                <TextFieldWLabel
                    id='mailNickname'
                    labelText='Mail Nickname'
                    onChange={mailNicknameTextFieldHandler}
                />

                <InputSubmitButton value='Create' />
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <p className='errorText'>{error.message}</p>}
        </SideModal>
    );
};

export default CGroupsCreateModal;