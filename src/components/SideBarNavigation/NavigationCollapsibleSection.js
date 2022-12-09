// NavigationCollapsibleSection.js
// iDSimplify Frontend
// Created by Reece English on 08.12.2022

import { NavLink } from "react-router-dom";

const NavigationCollapsibleSection = (props) => {
    return (
        <>
            <li>
                <button>
                    <NavLink to={props.sectionData.link}>
                        {props.sectionData.text}
                    </NavLink>
                </button>
            </li>
            {props.sectionData.sublinks.map(item => (
                <li key={item.id}>
                    <button>
                        <NavLink to={item.link}>
                            {item.text}
                        </NavLink>
                    </button>
                </li>
            ))}
        </>
    );
};

export default NavigationCollapsibleSection;