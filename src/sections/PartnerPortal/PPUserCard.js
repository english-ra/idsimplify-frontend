// PPUserCard.js
// iDSimplify Frontend
// Created by Reece English on 21.04.2023

import CircularButton from '../../components/Buttons/CircularButton';
import classes from './PPUserCard.module.css';

const PPUserCard = (props) => {
    const user = props.data;

    return (
        <div className={classes.root}>
            <div className={classes.imageDiv} />

            <h3>{user && user.displayName}</h3>
            <p>{user && user.userPrincipalName}</p>
        </div>
    );
};

export default PPUserCard;