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



    // return (
    //     <Routes>
    //         <Route path='/join/organisation' element={<CreateRootOrganisation />} />
    //         <Route path='/organisation-center' element={<OrganisationCenter />} />
    //     </Routes>

    //     //   <Layout>
    //     //     <Routes>
    //     //       <Route path='/' />
    //     //       <Route path='/dashboard' element={<Dashboard />} />
    //     //       <Route path='/integrations' element={<Integrations />} />
    //     //     </Routes>
    //     //   </Layout>
    //     // </>
    // );

export default App;