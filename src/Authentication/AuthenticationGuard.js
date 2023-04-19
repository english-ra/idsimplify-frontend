// AuthenticationGuard.js
// iDSimplify Frontend
// Created by Reece English on 12.03.2023

import { withAuthenticationRequired } from "@auth0/auth0-react";

const AuthenticationGuard = ({component}) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <p>Checking authorisation...</p>
        )
    });

    return <Component />;
};

export default AuthenticationGuard;