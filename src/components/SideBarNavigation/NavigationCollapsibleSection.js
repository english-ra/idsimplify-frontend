// NavigationCollapsibleSection.js
// iDSimplify Frontend
// Created by Reece English on 08.12.2022

import NavigationSectionHeader from "./NavigationSectionHeader";

const NavigationCollapsibleSection = (props) => {
    return (
        <>
            <NavigationSectionHeader headerTitle={props.sectionTitle} />
        </>
    );
};

export default NavigationCollapsibleSection;