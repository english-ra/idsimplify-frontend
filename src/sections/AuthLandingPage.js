// AuthLandingPage.js
// iDSimplify Frontend
// Created by Reece English on 06.03.2023

import LayoutInner from '../components/layout/LayoutInner';
import LayoutPublic from '../components/layout/LayoutPublic';

import classes from './AuthLandingPage.module.css';

const AuthLandingPage = (props) => {
    return (
        <LayoutPublic>
            <LayoutInner
                className={classes.inner}
            >
                <span>Welcome to</span>
                <h1>iDSimplify</h1>

                <p>Please select what you would like to do?</p>
            </LayoutInner>
        </LayoutPublic>
    );
};

export default AuthLandingPage;