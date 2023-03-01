import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LayoutInner from './components/layout/LayoutInner';
import LayoutPublic from './components/layout/LayoutPublic';

import Dashboard from './screens/Dashboard';
import Integrations from './screens/Integrations';
import CreateRootOrganisation from './screens/Join/CreateRootOrganisation';
import OrganisationCenter from './screens/OrganisationCenter/Structure/OrganisationCenter';

function App() {

  let authenticated = false;

  let unauthed = (
    <>
      <LayoutPublic>
        <LayoutInner>
          <CreateRootOrganisation />
        </LayoutInner>
      </LayoutPublic>
    </>
  );

  let authed = (
    <>
      <h1>Authorised</h1>
    </>
  );

  // if (authenticated) { return authed; }
  // else { return unauthed; }

  return (
    <OrganisationCenter />
  );


  // return (
  //   <>
  //     <Routes>
  //       <Route path='/join/organisation' element={<CreateRootOrganisation />} />

  //     </Routes>









  //     <Layout>
  //       <Routes>
  //         <Route path='/' />
  //         <Route path='/dashboard' element={<Dashboard />} />
  //         <Route path='/integrations' element={<Integrations />} />
  //       </Routes>
  //     </Layout>
  //   </>
  // );
}

export default App;