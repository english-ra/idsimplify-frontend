// CreateRootOrganisation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import PrimaryFormButton from '../../components/Buttons/PrimaryFormButton';
import classes from './CreateRootOrganisation.module.css';

const CreateRootOrganisation = () => {
    return (
        <div>
            <h1 className={classes.h1}>
                Create your Organisation
            </h1>

            <PrimaryFormButton>
                Create
            </PrimaryFormButton>
        </div>
    );
};
        
export default CreateRootOrganisation;