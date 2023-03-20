// AuthLandingPage.js
// iDSimplify Frontend
// Created by Reece English on 06.03.2023

import { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAuthed from '../../components/layout/LayoutAuthed';
import LayoutInner from '../../components/layout/LayoutInner';
import Dropdown from '../../components/Select/Dropdown';

import classes from './AuthLandingPage.module.css';

const AuthLandingPage = (props) => {
    const [tenancies, setTenancies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LayoutAuthed>
            <LayoutInner
                className={classes.inner}
            >
                <span>Welcome to</span>
                <h1>iDSimplify</h1>

                {
                    isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        tenancies.length === 0 ? (
                            <>
                                <p>You are not currently a member of any tenacies. Please ask your admin to add you to the tenacy or create a new one below.</p>
                                <Link to='/join'>Register a New Tenancy</Link>
                            </>
                        ) : (
                            <>
                                <p>Please select the tenacy to work with?</p>
                                <Dropdown title='Tenancy: ' data={tenancies} />

                                <p>Please select what you would like to do?</p>

                                <ul>
                                    <li><Link to='/oc'>Organisation Center</Link></li>
                                    <li><Link to='/control'>Control</Link></li>
                                    <li><Link to='/pp'>Partner Portal</Link></li>
                                </ul>
                            </>
                        )
                    )
                }

            </LayoutInner>
        </LayoutAuthed>
    );
};

export default AuthLandingPage;