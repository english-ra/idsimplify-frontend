// TableRow.js
// iDSimplify Frontend
// Created by Reece English on 27.02.2023

import classes from './TableRow.module.css';

const TableRow = (props) => {

    const rowClickHandler = () => {
        props.onClick(props.data.id);
    };

    const isPending = () => {
        if (props.data.request != null) { return classes.pending; }
    };

    return (
        <tr
            className={`${classes.row} ${isPending()}`}
            onClick={rowClickHandler}
            key={props.key}
        >
            {props.cols.map(col => (
                <td>{props.data[col.dataKey]}</td>
            ))}
        </tr>
    );
};

export default TableRow;