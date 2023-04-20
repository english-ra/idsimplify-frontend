// Dropdown.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

import classes from './Dropdown.module.css';

const Dropdown = (props) => {

    const data = props.data || [];
    const dataKey = props.dataKey || 'name';
    const selected = data.find((d) => { return d.id === props.value; });

    var selectedName = undefined;
    if (selected != undefined) { selectedName = selected.name; }

    const selectChangeHandler = (event) => {
        const i = event.target.selectedIndex - 1;

        if (i === -1) {
            props.onSelected(null);
        } else {
            props.onSelected(data[i]);
        }
    };

    return (
        <div>
            <label>{props.title}</label>

            <select
                id={props.id}
                name={props.id}
                title={props.id}
                className={`${classes.select} ${props.className}`}
                value={selectedName}
                onChange={selectChangeHandler}
            >
                <option>Please select</option>
                {data.map(d => (<option key={d.id}>{d[dataKey]}</option>))}
            </select>
        </div>
    );
};

export default Dropdown;