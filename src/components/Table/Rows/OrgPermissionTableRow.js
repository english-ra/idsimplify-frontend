// OrgPermissionTableRow.js
// iDSimplify Frontend
// Created by Reece English on 01.03.2023

import CheckBoxTableCell from '../Cells/CheckBoxTableCell';
import classes from './OrgPermissionTableRow.module.css';

const OrgPermissionTableRow = (props) => {
    return (
        <tr className={classes.row}>
            <td>Org Name</td>
            <CheckBoxTableCell />
            <CheckBoxTableCell />
        </tr>
    );
};

export default OrgPermissionTableRow;