// SideModalTable.js
// iDSimplify Frontend
// Created by Reece English on 01.02.2023

import TableHeading from "./TableHeading";

import classes from './SideModalTable.module.css';
import CircularButton from "../Buttons/CircularButton";

const SideModalTable = (props) => {
    return (
        <table className={`${classes.table} ${props.className}`}>
            <TableHeading headings={props.headings} />
            {props.children}
        </table>
    );
};

export default SideModalTable;