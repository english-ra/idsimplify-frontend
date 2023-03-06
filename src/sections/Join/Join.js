// Join.js
// iDSimplify Frontend
// Created by Reece English on 04.03.2022

import LayoutInner from "../../components/layout/LayoutInner";
import LayoutPublic from "../../components/layout/LayoutPublic";
import CreateRootOrganisation from "./CreateRootOrganisation";

const Join = () => {
    return (
        <LayoutPublic>
            <LayoutInner>
                <CreateRootOrganisation />
            </LayoutInner>
        </LayoutPublic>
    );
};
        
export default Join;