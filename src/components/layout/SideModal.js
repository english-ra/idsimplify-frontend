// SideModal.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import { useLocation, useNavigate } from 'react-router-dom';
import CircularButton from '../Buttons/CircularButton';
import classes from './SideModal.module.css';

const SideModal = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const closeButtonHandler = () => {
        navigate(`..${location.search}`);
    };

    return (
        <section className={`${classes.section} ${props.className}`}>
            <CircularButton
                className={classes.closeButton}
                text='x'
                onClick={closeButtonHandler}
            />
            {props.children}
        </section>
    );
};

export default SideModal;