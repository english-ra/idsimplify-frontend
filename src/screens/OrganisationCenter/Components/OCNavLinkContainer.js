// OCNavLinkContainer.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

// import classes from './OCNavLinkContainer.module.css';

const OCNavLinkContainer = (props) => {
    return (
        <nav>
            <ul>
                {props.children}
            </ul>
        </nav>
    );
};

export default OCNavLinkContainer;