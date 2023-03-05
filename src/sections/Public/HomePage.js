// HomePage.js
// iDSimplify Frontend
// Created by Reece English on 04.03.2023

import { Link } from 'react-router-dom';
import LayoutInner from '../../components/layout/LayoutInner';
import LayoutPublic from '../../components/layout/LayoutPublic';

import classes from './HomePage.module.css';

const HomePage = (props) => {
    return (
        <LayoutPublic>
            <LayoutInner
                className={classes.inner}
            >
                <span>Welcome to</span>
                <h1>iDSimplify</h1>

                <p>Please select what you would like to do?</p>

                <ul>
                    <li>
                        <Link>
                            <h3>Sign up</h3>
                            <span>Click here to register your organisation with iDSimplify and simplify your ID management today!</span>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <h3>Login</h3>
                            <span>Click here if you already apart of an organisation</span>
                        </Link>
                    </li>
                </ul>
            </LayoutInner>
        </LayoutPublic>
    );
};

export default HomePage;