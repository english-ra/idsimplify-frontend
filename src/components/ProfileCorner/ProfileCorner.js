// ProfileCorner.js
// iDSimplify Frontend
// Created by Reece English on 11.03.2023

import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProfileCorner.module.css';

const ProfileCorner = (props) => {
    const [open, setOpen] = useState(false);

    const { logout, user } = useAuth0();
    const { name = '', picture = '', email ='' } = user || {};

    return (
        <div className={`${classes.root} ${props.className}`}>

            <div
                className={classes.menuTrigger}
                onClick={() => setOpen(!open)}
            >
                <img className={classes.profileImage} src={picture} />
                <p className={classes.nameText}>{name}</p>
            </div>

            <div className={`${classes.menu} ${open ? classes.active : classes.inactive}`}>
                <span>{email}</span>
                <ul>
                    <li><Link to='/authedlandingpage'>Main Menu</Link></li>
                    <li><Link to='/profile'>My Account</Link></li>
                    <li>
                        <button
                            onClick={() => logout()}
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileCorner;