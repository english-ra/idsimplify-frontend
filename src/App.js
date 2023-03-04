import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './HomePage';

import CreateRootOrganisation from './sections/Join/CreateRootOrganisation';
import OrganisationCenter from './sections/OrganisationCenter/Structure/OrganisationCenter';
import Control from './sections/Control/Control';
import PartnerPortal from './sections/PartnerPortal/PartnerPortal';
import Join from './sections/Join/Join';

const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/join', element: <Join /> },
    { path: '/oc', element: <OrganisationCenter /> },
    { path: '/control', element: <Control /> },
    { path: '/pp', element: <PartnerPortal /> }
]);

function App() {
    return <RouterProvider router={router} />;
};

export default App;