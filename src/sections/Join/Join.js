// Join.js
// iDSimplify Frontend
// Created by Reece English on 04.03.2022

import LayoutInner from "../../components/layout/LayoutInner";
import LayoutAuthed from "../../components/layout/LayoutAuthed";
import CreateRootOrganisation from "./CreateRootOrganisation";

const Join = () => {
    return (
        <LayoutAuthed>
            <LayoutInner>
                <CreateRootOrganisation />
            </LayoutInner>
        </LayoutAuthed>
    );
};
        
export default Join;