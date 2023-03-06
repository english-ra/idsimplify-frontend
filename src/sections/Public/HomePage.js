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
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();

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
                        className={classes.signup}
                        to='join'
                    >
                        <h3>Sign up</h3>
                        <span>Click here to register your organisation with iDSimplify and simplify your ID management today!</span>
                    </Link>

                    <Link
                        className={classes.login}
                        onClick={() => loginWithRedirect()}
                    >
                        <h3>Login</h3>
                        <span>Click here if you already apart of an organisation</span>
                    </Link>
                </div>
            </LayoutInner>
        </LayoutPublic>
    );
};

export default HomePage;