// AuthLandingPage.js
// iDSimplify Frontend
// Created by Reece English on 06.03.2023

import { Link } from 'react-router-dom';

import LayoutInner from '../../components/layout/LayoutInner';
import LayoutPublic from '../../components/layout/LayoutPublic';

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

                <ul>
                    <li><Link to='/oc'>Organisation Center</Link></li>
                    <li><Link to='/control'>Control</Link></li>
                    <li><Link to='/pp'>Partner Portal</Link></li>
                </ul>
            </LayoutInner>
        </LayoutPublic>
    );
};

export default AuthLandingPage;