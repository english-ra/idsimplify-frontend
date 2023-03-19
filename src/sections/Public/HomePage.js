// HomePage.js
// iDSimplify Frontend
// Created by Reece English on 04.03.2023

import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Auth0ProviderWithHistory from '../../Authentication/auth0Provider';
import LayoutInner from '../../components/layout/LayoutInner';
import LayoutPublic from '../../components/layout/LayoutPublic';

import classes from './HomePage.module.css';

const HomePage = (props) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <LayoutPublic>
            <LayoutInner
                className={classes.inner}
            >
                <span>Welcome to</span>
                <h1>iDSimplify</h1>

                <p>Please select what you would like to do?</p>

                <div className={classes.links}>
                    <Link
                        className={classes.login}
                        onClick={() => loginWithRedirect()}
                    >
                        <h3>Login / Register</h3>
                    </Link>
                </div>

                <p>To register a new tenancy, you will first need to sign in or register. Please do so using the above button.</p>
            </LayoutInner>
        </LayoutPublic>
    );
};

export default HomePage;