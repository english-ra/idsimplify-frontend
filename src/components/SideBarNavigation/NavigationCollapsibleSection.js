// NavigationCollapsibleSection.js
// iDSimplify Frontend
// Created by Reece English on 08.12.2022

import { useState } from "react";
import { NavLink } from "react-router-dom";

import NavigationHeader from "./NavigationHeader";
import NavigationSublink from "./NavigationSublink";

const NavigationCollapsibleSection = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const headerClickedHandler = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <NavigationHeader
                data={props.sectionData}
                key={props.sectionData.id}
                onClick={headerClickedHandler}
            />

            { !isCollapsed && props.sectionData.sublinks.map(item => (
                <NavigationSublink key={item.id} item={item} />
            ))}
        </>
    );
};

export default NavigationCollapsibleSection;