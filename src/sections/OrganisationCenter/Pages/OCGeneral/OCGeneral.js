// OCGeneral.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import InputLabel from '../../../../components/InputFields/InputLabel';
import InputSubmitButton from '../../../../components/InputFields/InputSubmitButton';
import InputTextField from '../../../../components/InputFields/InputTextField';

import classes from './OCGeneral.module.css';

const OCGeneral = (props) => {
    return (
        <>
            <h1>General</h1>

            <form className={classes.form}>
                <InputLabel for='nameField'>Name:</InputLabel><br />
                <InputTextField id='nameField' />
                <InputSubmitButton value='Update' />
            </form>
        </>
    );
};

export default OCGeneral;