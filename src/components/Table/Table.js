// Table.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import TableHeading from "./TableHeading";

import classes from './Table.module.css';
import CircularButton from "../Buttons/CircularButton";

const Table = (props) => {
    return (
        <div className={classes.div}>
            <table className={classes.table}>
                <TableHeading headings={props.headings} />
                {props.children}
            </table>

            <CircularButton text='...' />
        </div>
    );
};

export default Table;