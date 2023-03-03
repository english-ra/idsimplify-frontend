// SideModal.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import CircularButton from '../Buttons/CircularButton';
import classes from './SideModal.module.css';

const SideModal = (props) => {
    return (
        <section className={`${classes.section} ${props.className}`}>
            <CircularButton
                className={classes.closeButton}
                text='x'
            />
            {props.children}
        </section>
    );
};

export default SideModal;