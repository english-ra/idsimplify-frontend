// Dropdown.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

// import classes from './Dropdown.module.css';

const Dropdown = (props) => {
    return (
        <div>
            <label>{props.title}</label>

            <select>
                {props.data.map(data => (<option>{data}</option>))}
            </select>
        </div>
    );
};

export default Dropdown;