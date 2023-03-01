// OCUsersDetailsModal.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import TextFieldWLabel from '../../../components/InputFields/TextFieldWLabel';
import SideModal from '../Structure/SideModal';
import classes from './OCUsersDetailsModal.module.css';

const OCUsersDetailsModal = (props) => {
    return (
        <SideModal>
            <h1>Users Name</h1>
            <h3>User Details</h3>

            <form
                className={classes.form}
            >
                <TextFieldWLabel
                    id='fName'
                    labelText='First name'
                />
                <TextFieldWLabel
                    id='displayName'
                    labelText='Display Name'
                />
                <TextFieldWLabel
                    id='email'
                    labelText='Email address'
                />

                <TextFieldWLabel
                    id='lName'
                    labelText='Last name'
                />
                <TextFieldWLabel
                    id='username'
                    labelText='Username'
                />
            </form>

            <h3>Organisation Permissions</h3>
        </SideModal>
    );
};

export default OCUsersDetailsModal;