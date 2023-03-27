// TableRow.js
// iDSimplify Frontend
// Created by Reece English on 27.02.2023

import classes from './TableRow.module.css';

const TableRow = (props) => {

    const rowClickHandler = () => {
        props.onClick(props.data.id);
    };

    return (
        <tr
            className={classes.row}
            onClick={rowClickHandler}
        >
            {props.cols.map(col => (
                <td>{props.data[col.dataKey]}</td>
            ))}
        </tr>
    );
};

export default TableRow;