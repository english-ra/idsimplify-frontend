// AcceptDenyBox.js
// iDSimplify Frontend
// Created by Reece English on 17.04.2023

import { Link } from 'react-router-dom';
import LayoutAuthed from '../../components/layout/LayoutAuthed';
import LayoutInner from '../../components/layout/LayoutInner';

import classes from './AcceptDenyBox.module.css';

const AcceptDenyBox = (props) => {

    const data = props.data;
    const headingText = props.headingText;
    const subheadingText = props.subheadingText;

    const acceptInvitationHandler = () => { props.onAccept(data); };
    const denyInvitationHandler = () => { props.onDeny(data); };

    return (
        <div className={`${classes.root} ${props.className}`}>
            <div className={classes.textDiv}>
                <h4>{headingText}</h4>
                <p>{subheadingText}</p>
            </div>

            <div className={classes.buttonDiv}>
                <button className={classes.accept} onClick={acceptInvitationHandler}>Accept</button>
                <button className={classes.deny} onClick={denyInvitationHandler}>Deny</button>
            </div>
        </div>
    );
};

export default AcceptDenyBox;