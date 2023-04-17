// OCUsersCreateModal.js
// iDSimplify Frontend
// Created by Reece English on 17.04.2023

import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import classes from './OCUsersCreateModal.module.css';
import PopUpModal from '../../../../components/layout/PopUpModal';
import InputLabel from '../../../../components/InputFields/InputLabel';
import InputSubmitButton from '../../../../components/InputFields/InputSubmitButton';
import InputTextField from '../../../../components/InputFields/InputTextField';

const OCUsersCreateModal = (props) => {
    const { getAccessTokenWithPopup } = useAuth0();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const body = {
                email: email
            };

            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/users`, {
                method: 'POST',
                body: JSON.stringify(body),
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

    const emailChangeHandler = (event) => { setEmail(event.target.value); };

    return (
        <PopUpModal>
            <h1 className={classes.h1}>Add a User</h1>
            <p>Please enter the email address of the user you wish to add to this tenancy.</p>
            <p>If the user has an account with us, they will receive an email stating what to do next.</p>

            <form
                className={classes.form}
                onSubmit={submitHandler}
            >
                <InputLabel for='emailField'>Email address:</InputLabel>
                <InputTextField id='emailField' onChange={emailChangeHandler} />
                <InputSubmitButton
                    value='Request'
                    disabled={isLoading}
                />
            </form>

            {!isLoading && error && <p className='errorText'>{error.message}</p>}
            {isLoading && <p>Loading...</p>}
        </PopUpModal>
    );
};

export default OCUsersCreateModal;