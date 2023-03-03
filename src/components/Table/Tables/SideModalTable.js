// SideModalTable.js
// iDSimplify Frontend
// Created by Reece English on 01.02.2023

import TableHeading from "../Headings/TableHeading";

import classes from './SideModalTable.module.css';

const SideModalTable = (props) => {
    return (
        <table className={`${classes.table} ${props.className}`}>
            <TableHeading headings={props.headings} />
            <tbody>
                {props.children}
            </tbody>
        </table>
    );
};

export default SideModalTable;