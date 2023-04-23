// OCUsersDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import { useNavigate, useParams } from 'react-router-dom';

import SideModal from '../../../../components/layout/SideModal';
import PrimaryFormButton from '../../../../components/Buttons/PrimaryFormButton';
import classes from './OCUsersDetailsModal.module.css';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const OCUsersDetailsModal = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteUserButtonHandler = async () => {
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

            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/users/${params.userId}`, {
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
            <h1>Delete User</h1>
            <PrimaryFormButton className={classes.deleteUser} onClick={deleteUserButtonHandler} >Delete User</PrimaryFormButton>

            {isLoading && <p>Loading...</p>}
            {error && <p className='errorText'>{error.message}</p>}
        </SideModal>
    );
};

export default OCUsersDetailsModal;