// TableRowSelectable.js
// iDSimplify Frontend
// Created by Reece English on 20.04.2023

import { useState } from "react";
import TableRow from "./TableRow";

import classes from './TableRowSelectable.module.css';

const TableRowSelectable = (props) => {

    const rowClickHandler = () => {
        props.onClick(props.data);
    };

    return (
        <TableRow
            data={props.data}
            cols={props.cols}
            onClick={rowClickHandler}
            className={props.data.selected && classes.selected}
        />
    );
};

export default TableRowSelectable;