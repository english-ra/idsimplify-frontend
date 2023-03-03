// CheckBoxTableCell.js
// iDSimplify Frontend
// Created by Reece English on 01.03.2023

import Checkbox from '../../Checkbox/Checkbox';

import classes from './CheckBoxTableCell.module.css';

const CheckBoxTableCell = (props) => {
    return (
        <td className={classes.cell}>
            <Checkbox />
        </td>
    );
};

export default CheckBoxTableCell;