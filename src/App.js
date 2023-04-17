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
import CUsers from './sections/Control/Pages/CUsers';
import CUsersDetailsModal from './sections/Control/Pages/CUsersDetailsModal';
import CUsersCreateModal from './sections/Control/Pages/CUsersCreateModal';
import OCOrganisationsCreateModal from './sections/OrganisationCenter/Pages/OCOrganisations/OCOrganisationsCreateModal';
import OCUsersCreateModal from './sections/OrganisationCenter/Pages/OCUsers/OCUsersCreateModal';

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
                                path: '/oc/:tenancyId/users/create',
                                element: <OCUsersCreateModal />
                            },
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
                                path: '/oc/:tenancyId/organisations/create',
                                element: <OCOrganisationsCreateModal />
                            },
                            {
                                path: '/oc/:tenancyId/organisations/:organisationId',
                                element: <OCOrganisationsDetailsModal />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/control/:tenancyId',
                element: <AuthenticationGuard component={Control} />,
                children: [
                    {
                        path: '/control/:tenancyId/users',
                        element: <CUsers />,
                        children: [
                            {
                                path: '/control/:tenancyId/users/create',
                                element: <CUsersCreateModal />
                            },
                            {
                                path: '/control/:tenancyId/users/:userId',
                                element: <CUsersDetailsModal />
                            }
                        ]
                    },
                    {
                        path: '/control/:tenancyId/groups',
                        element: <h1>Groups</h1>,
                        children: [
                            {
                                path: '/control/:tenancyId/groups/:groupId',
                                element: <h1>Group</h1>
                            }
                        ]
                    }
                ]
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