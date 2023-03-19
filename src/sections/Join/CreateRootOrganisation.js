// CreateRootOrganisation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { useAuth0 } from '@auth0/auth0-react';
import InputLabel from '../../components/InputFields/InputLabel';
import InputSubmitButton from '../../components/InputFields/InputSubmitButton';
import InputTextField from '../../components/InputFields/InputTextField';

import classes from './CreateRootOrganisation.module.css';

const CreateRootOrganisation = () => {
    const { getAccessTokenWithPopup } = useAuth0();

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            // Get the users access token
            const accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const response = await fetch('https://api.idsimplify.co.uk/tenant', {
                method: 'POST',
                body: JSON.stringify({ "test": "test" }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (e) {
            console.log(e);
        }


    };

    return (
        <>
            <h1 className={classes.h1}>
                Create your Organisation
            </h1>

            <form
                className={classes.form}
                onSubmit={submitHandler}
            >
                <InputLabel for='orgField'>Organisation name:</InputLabel>
                <InputTextField id='orgField' />
                <InputSubmitButton value='Create' />
            </form>
        </>
    );
};

export default CreateRootOrganisation;