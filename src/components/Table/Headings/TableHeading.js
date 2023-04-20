// TableHeading.js
// iDSimplify Frontend
// Created by Reece English on 27.02.2023

import classes from './TableHeading.module.css';

const TableHeading = (props) => {
    return (
        <thead>
            <tr className={classes.row}>
                {props.headings.map(heading => (<th key={heading.id}>{heading.friendlyTitle}</th>))}
            </tr>
        </thead>
    );
};

export default TableHeading;