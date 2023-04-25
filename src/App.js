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
import OCOrganisationsIntegrationsCreateModal from './sections/OrganisationCenter/Pages/OCOrganisations/OCOrganisationsIntegrationsCreateModal';
import OCOrganisationsUserAddModal from './sections/OrganisationCenter/Pages/OCOrganisations/OCOrganisationsUserAddModal';
import PPUsers from './sections/PartnerPortal/Pages/PPUsers';
import CGroups from './sections/Control/Pages/CGroups';
import CGroupsCreateModal from './sections/Control/Pages/CGroupsCreateModal';
import CGroupsDetailsModal from './sections/Control/Pages/CGroupsDetailsModal';

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
                                element: <OCOrganisationsDetailsModal />,
                            },
                            {
                                path: '/oc/:tenancyId/organisations/:organisationId/integrations/create',
                                element: <OCOrganisationsIntegrationsCreateModal />
                            },
                            {
                                path: '/oc/:tenancyId/organisations/:organisationId/users/add',
                                element: <OCOrganisationsUserAddModal />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/control',
                element: <AuthenticationGuard component={Control} />,
                children: [
                    {
                        path: '/control/users',
                        element: <CUsers />,
                        children: [
                            {
                                path: '/control/users/create',
                                element: <CUsersCreateModal />
                            },
                            {
                                path: '/control/users/:userId',
                                element: <CUsersDetailsModal />
                            }
                        ]
                    },
                    {
                        path: '/control/groups',
                        element: <CGroups />,
                        children: [
                            {
                                path: '/control/groups/create',
                                element: <CGroupsCreateModal />
                            },
                            {
                                path: '/control/groups/:groupId',
                                element: <CGroupsDetailsModal />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/pp/',
                element: <AuthenticationGuard component={PartnerPortal} />,
                children: [
                    {
                        path: '/pp/users',
                        element: <PPUsers />
                    }
                ]
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
};

export default App;