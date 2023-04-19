// Profile.js
// iDSimplify Frontend
// Created by Reece English on 12.03.2023

import { Link } from 'react-router-dom';
import LayoutAuthed from '../../components/layout/LayoutAuthed';
import LayoutInner from '../../components/layout/LayoutInner';

import classes from './Profile.module.css';
import AcceptDenyBox from '../../components/AcceptDenyBox/AcceptDenyBox';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tenancyInvitationsLoading, setTenancyInvitationsLoading] = useState(false);
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        getTenancyInvitations();
    };

    const getAccessToken = async () => {
        var accessToken = '';
        try {
            // Get the users access token
            accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });
        }
        catch (err) {
            console.log(err);
        }
        return accessToken;
    };

    const getTenancyInvitations = async () => {
        setTenancyInvitationsLoading(true);
        try {
            const accessToken = await getAccessToken();

            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/users/me/tenancies/invitations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setInvitations([...data]);
            } else {
                throw new Error(data);
            }
        }
        catch (err) {
            console.log(err);
            setError(error);
        }
        setTenancyInvitationsLoading(false);
    };

    const acceptInvitationHandler = async (invitation) => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();

            const response = await fetch(`https://api.idsimplify.co.uk/users/me/tenancies/invitations/${invitation.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                getData();
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

    const denyInvitationHandler = async (invitation) => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();

            const response = await fetch(`https://api.idsimplify.co.uk/users/me/tenancies/invitations/${invitation.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Check the request was successfull
            if (response.status === 200) {
                getData();
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
        <LayoutAuthed>
            <LayoutInner
                className={classes.inner}
            >
                <h1>Profile</h1>

                <h3>Tenancy Invites</h3>
                {
                    tenancyInvitationsLoading ? (
                        <p>Loading...</p>
                    ) : (
                        invitations.length === 0 ? (
                            <p>No invitations found</p>
                        ) : (
                            <div className={classes.tenancyInvites}>
                                {
                                    invitations.map(
                                        (invitation) => (
                                            <AcceptDenyBox
                                                key={invitation.id}
                                                data={invitation}
                                                headingText={invitation.name}
                                                subheadingText={`Invited by: ${invitation.invitedBy.name}`}
                                                onAccept={acceptInvitationHandler}
                                                onDeny={denyInvitationHandler}
                                            />
                                        )
                                    )
                                }
                            </div>
                        )
                    )
                }
                {error && <p className='errorText'>{error.message}</p>}
            </LayoutInner>
        </LayoutAuthed>
    );
};

export default Profile;