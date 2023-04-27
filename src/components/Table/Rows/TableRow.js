// TableRow.js
// iDSimplify Frontend
// Created by Reece English on 27.02.2023

import classes from './TableRow.module.css';

const TableRow = (props) => {

    const rowClickHandler = () => {
        props.onClick(props.data);
    };

    return (
        <tr
            className={`${classes.row} ${props.className} ${props.data.accountEnabled != undefined && !props.data.accountEnabled && classes.disabled}`}
            onClick={rowClickHandler}
        >
            {props.cols.map(col => (
                <td key={col.id}>{
                    Array.isArray(props.data[col.dataKey]) ? props.data[col.dataKey].toString() : props.data[col.dataKey]
                }</td>
            ))}
        </tr>
    );
};

export default TableRow;