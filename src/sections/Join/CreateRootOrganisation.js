// CreateRootOrganisation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '../../components/InputFields/InputLabel';
import InputSubmitButton from '../../components/InputFields/InputSubmitButton';
import InputTextField from '../../components/InputFields/InputTextField';

import classes from './CreateRootOrganisation.module.css';

const CreateRootOrganisation = () => {
    const { getAccessTokenWithPopup } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [tenancyName, setTenancyName] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });
            
            const tenancyData = {
                name: tenancyName
            };

            const response = await fetch('https://api.idsimplify.co.uk/tenancy', {
                method: 'POST',
                body: JSON.stringify(tenancyData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                // Navigate back to the auth landing page
                navigate('/authedlandingpage');
            }

            // const data = await response.json();
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    const nameChangeHandler = (event) => { setTenancyName(event.target.value); };

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
                <InputTextField id='orgField' onChange={nameChangeHandler} />
                <InputSubmitButton value='Create' />
            </form>

            <p>Please ensure that the names meets the below criteria:</p>
            <ul>
                <li>Between 6 and 127 characters</li>
            </ul>

            { isLoading && <p>Loading...</p> }
        </>
    );
};

export default CreateRootOrganisation;