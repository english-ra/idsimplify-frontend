// AcceptDenyBox.js
// iDSimplify Frontend
// Created by Reece English on 17.04.2023

import { Link } from 'react-router-dom';
import LayoutAuthed from '../../components/layout/LayoutAuthed';
import LayoutInner from '../../components/layout/LayoutInner';

import classes from './AcceptDenyBox.module.css';

const AcceptDenyBox = (props) => {
    return (
        <div className={`${classes.root} ${props.className}`}>
            <div className={classes.textDiv}>
                <h4>Tenancy Name</h4>
            </div>

            <div className={classes.buttonDiv}>
                <button>Accept</button>
                <button>Deny</button>
            </div>
        </div>
    );
};

export default AcceptDenyBox;