import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './HomePage';
import Error404 from './Error404';
import OrganisationCenter from './sections/OrganisationCenter/Structure/OrganisationCenter';
import Control from './sections/Control/Control';
import PartnerPortal from './sections/PartnerPortal/PartnerPortal';
import Join from './sections/Join/Join';
import OCGeneral from './sections/OrganisationCenter/Pages/OCGeneral';
import OCUsers from './sections/OrganisationCenter/Pages/OCUsers';
import OCUsersDetailsModal from './sections/OrganisationCenter/Pages/OCUsersDetailsModal';
import OCOrganisations from './sections/OrganisationCenter/Pages/OCOrganisations';
import OCOrganisationsDetailsModal from './sections/OrganisationCenter/Pages/OCOrganisationsDetailsModal';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <Error404 />
    },
    {
        path: '/join',
        element: <Join />
    },
    {
        path: '/oc',
        element: <OrganisationCenter />,
        children: [
            {
                path: '/oc/general',
                element: <OCGeneral />
            },
            {
                path: '/oc/users',
                element: <OCUsers />,
                children: [
                    {
                        path: '/oc/users/:userId',
                        element: <OCUsersDetailsModal />
                    }
                ]
            },
            {
                path: '/oc/organisations',
                element: <OCOrganisations />,
                children: [
                    {
                        path: '/oc/organisations/:orgId',
                        element: <OCOrganisationsDetailsModal />,
                        children: [
                            {
                                path: '/oc/organisations/:orgId/details',
                                element: <h1>Details</h1>
                            },
                            {
                                path: '/oc/organisations/:orgId/integrations',
                                element: <h1>Integrations</h1>
                            },
                            {
                                path: '/oc/organisations/:orgId/users',
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
        element: <Control />
    },
    {
        path: '/pp',
        element: <PartnerPortal />
    }
]);

function App() {
    return <RouterProvider router={router} />;
};

export default App;