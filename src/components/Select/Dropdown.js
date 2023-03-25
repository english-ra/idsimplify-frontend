// Dropdown.js
// iDSimplify Frontend
// Created by Reece English on 28.02.2023

// import classes from './Dropdown.module.css';

const Dropdown = (props) => {

    const tenancyData = props.data || [];

    const selectChangeHandler = (event) => {
        const i = event.target.selectedIndex - 1;

        if (i === -1) {
            props.onSelected(null);
        } else {
            props.onSelected(tenancyData[i]);
        }
    };

    return (
        <div>
            <label>{props.title}</label>

            <select
                onChange={selectChangeHandler}
            >
                <option>Please select</option>
                {tenancyData.map(data => (<option key={data.id}>{data.name}</option>))}
            </select>
        </div>
    );
};

export default Dropdown;