// Profile.js
// iDSimplify Frontend
// Created by Reece English on 12.03.2023

import { Link } from 'react-router-dom';
import LayoutAuthed from '../../components/layout/LayoutAuthed';
import LayoutInner from '../../components/layout/LayoutInner';

import classes from './Profile.module.css';

const Profile = (props) => {
    return (
        <LayoutAuthed>
            <LayoutInner
                className={classes.inner}
            >
                <h1>Profile</h1>
            </LayoutInner>
        </LayoutAuthed>
    );
};

export default Profile;