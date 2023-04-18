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
    const { getAccessTokenWithPopup } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        getData();
    },[]);

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
            const response = await fetch(`https://api.idsimplify.co.uk/users/me/tenancies/invitations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setInvitations([...data]);
            }
        }
        catch (err) {
            console.log(err);
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
                <div className={classes.tenancyInvites}>
                    <AcceptDenyBox />
                </div>
            </LayoutInner>
        </LayoutAuthed>
    );
};

export default Profile;