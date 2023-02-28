// Table.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import TableHeading from "./TableHeading";

import classes from './Table.module.css';

const Table = (props) => {
    return (
        <table className={classes.table}>
            <TableHeading headings={props.headings} />
            {props.children}
        </table>
    );
};

export default Table;