// CreateRootOrganisation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import PrimaryFormButton from '../../components/Buttons/PrimaryFormButton';
import InputLabel from '../../components/InputFields/InputLabel';
import InputSubmitButton from '../../components/InputFields/InputSubmitButton';
import InputTextField from '../../components/InputFields/InputTextField';

import classes from './CreateRootOrganisation.module.css';

const CreateRootOrganisation = () => {
    return (
        <>
            <h1 className={classes.h1}>
                Create your Organisation
            </h1>

            <form className={classes.form}>
                <InputLabel for='orgField'>Organisation name:</InputLabel>
                <InputTextField id='orgField' />
                <InputSubmitButton value='Create' />
            </form>
        </>
    );
};
        
export default CreateRootOrganisation;