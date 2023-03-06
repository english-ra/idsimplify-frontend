import { Outlet } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0Provider";

const Auth0ProviderLayout = () => (
    <Auth0ProviderWithHistory>
        <Outlet />
    </Auth0ProviderWithHistory>
);

export default Auth0ProviderLayout;