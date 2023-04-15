// OCOrganisationsCreateModal.js
// iDSimplify Frontend
// Created by Reece English on 15.04.2023

import { Outlet, useNavigate, useParams } from "react-router-dom";

import SideModal from "../../../../components/layout/SideModal";
import TextFieldWLabel from '../../../../components/InputFields/TextFieldWLabel';
import InputSubmitButton from '../../../../components/InputFields/InputSubmitButton';

import classes from './OCOrganisationsCreateModal.module.css';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const OCOrganisationsCreateModal = (props) => {
    const params = useParams();
    const { getAccessTokenWithPopup } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const nameTextFieldChangeHandler = (event) => { setName(event.target.value) };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Create the request body
        const body = {
            name: name
        };

        try {
            // Get the users access token
            const accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                // Navigate back to the users page
                navigate('..');
            } else {
                // An error has occurred
                
            }
        }
        catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    return (
        <SideModal
            className={classes.root}
        >
            <h1>Create an Organisation</h1>

            <form
                className={classes.form}
                onSubmit={onSubmitHandler}
            >
                <TextFieldWLabel
                    id='name'
                    labelText='Organisation name'
                    onChange={nameTextFieldChangeHandler}
                />

                <InputSubmitButton value='Create' />
            </form>

            { isLoading && <p>Loading...</p> }

        </SideModal>
    );
};

export default OCOrganisationsCreateModal;