// Table.js
// iDSimplify Frontend
// Created by Reece English on 20.02.2023

import TableHeading from "../Headings/TableHeading";

import classes from './Table.module.css';
import CircularButton from "../../Buttons/CircularButton";

const Table = (props) => {
    return (
        <div className={classes.div}>
            <table className={`${classes.table} ${props.className}`}>
                <TableHeading headings={props.headings} />
                <tbody>
                    {props.children}
                </tbody>
            </table>

            <CircularButton className={classes.colButton} text='...' />
        </div>
    );
};

export default Table;