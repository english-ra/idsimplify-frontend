// CreateRootOrganisation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import PrimaryFormButton from '../../components/Buttons/PrimaryFormButton';
import InputLabel from '../../components/InputFields/InputLabel';
import InputTextField from '../../components/InputFields/InputTextField';

import classes from './CreateRootOrganisation.module.css';

const CreateRootOrganisation = () => {
    return (
        <div>
            <h1 className={classes.h1}>
                Create your Organisation
            </h1>

            <form className={classes.form}>
                <InputLabel>Organisation name:</InputLabel>
                <InputTextField />
            </form>

            <PrimaryFormButton className={classes.button}>
                Create
            </PrimaryFormButton>
        </div>
    );
};
        
export default CreateRootOrganisation;