// Dropdown.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

// import classes from './Dropdown.module.css';

const Dropdown = (props) => {

    const tenancyData = props.data || [];

    return (
        <div>
            <label>{props.title}</label>

            <select>
                {tenancyData.map(data => (<option>{data.name}</option>))}
            </select>
        </div>
    );
};

export default Dropdown;