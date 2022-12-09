// NavigationSectionHeader.js
// iDSimplify Frontend
// Created by Reece English on 08.12.2022

const NavigationSectionHeader = (props) => {
    return (
        <li>
            <button>
                <div>{props.headerTitle}</div>
                <i></i>
            </button>
        </li>
    );
};

export default NavigationSectionHeader;