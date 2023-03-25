import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './sections/Public/HomePage';
import Error404 from './sections/Public/Error404';
import OrganisationCenter from './sections/OrganisationCenter/Structure/OrganisationCenter';
import Control from './sections/Control/Control';
import PartnerPortal from './sections/PartnerPortal/PartnerPortal';
import Join from './sections/Join/Join';
import OCGeneral from './sections/OrganisationCenter/Pages/OCGeneral/OCGeneral';
import OCUsers from './sections/OrganisationCenter/Pages/OCUsers/OCUsers';
import OCUsersDetailsModal from './sections/OrganisationCenter/Pages/OCUsers/OCUsersDetailsModal';
import OCOrganisations from './sections/OrganisationCenter/Pages/OCOrganisations/OCOrganisations';
import OCOrganisationsDetailsModal from './sections/OrganisationCenter/Pages/OCOrganisations/OCOrganisationsDetailsModal';
import Auth0ProviderLayout from './Authentication/auth0ProviderLayout.js';
import AuthLandingPage from './sections/Authenticated/AuthLandingPage';
import AuthenticationGuard from './Authentication/AuthenticationGuard';
import Profile from './sections/Profile/Profile';

const router = createBrowserRouter([
    {
        element: <Auth0ProviderLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                errorElement: <Error404 />
            },
            {
                path: '/join',
                element: <AuthenticationGuard component={Join} />
            },
            {
                path: '/authedlandingpage',
                element: <AuthenticationGuard component={AuthLandingPage} />
            },
            {
                path: '/profile',
                element: <AuthenticationGuard component={Profile} />
            },
            {
                path: '/oc/:tenancyId',
                element: <AuthenticationGuard component={OrganisationCenter} />,
                children: [
                    {
                        path: '/oc/:tenancyId/general',
                        element: <OCGeneral />
                    },
                    {
                        path: '/oc/:tenancyId/users',
                        element: <OCUsers />,
                        children: [
                            {
                                path: '/oc/:tenancyId/users/:userId',
                                element: <OCUsersDetailsModal />
                            }
                        ]
                    },
                    {
                        path: '/oc/:tenancyId/organisations',
                        element: <OCOrganisations />,
                        children: [
                            {
                                path: '/oc/:tenancyId/organisations/:orgId',
                                element: <OCOrganisationsDetailsModal />,
                                children: [
                                    {
                                        path: '/oc/:tenancyId/organisations/:orgId/details',
                                        element: <h1>Details</h1>
                                    },
                                    {
                                        path: '/oc/:tenancyId/organisations/:orgId/integrations',
                                        element: <h1>Integrations</h1>
                                    },
                                    {
                                        path: '/oc/:tenancyId/organisations/:orgId/users',
                                        element: <h1>Users</h1>
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: '/control',
                element: <AuthenticationGuard component={Control} />
            },
            {
                path: '/pp',
                element: <AuthenticationGuard component={PartnerPortal} />
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
};

export default App;