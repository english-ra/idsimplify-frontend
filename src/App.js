import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LayoutPublic from './components/layout/LayoutPublic';

import Dashboard from './pages/Dashboard';
import Integrations from './pages/Integrations';
import CreateRootOrganisation from './pages/Join/CreateRootOrganisation';

function App() {

  let authenticated = false;

  let unauthed = (
    <>
      <LayoutPublic>
        <CreateRootOrganisation />
      </LayoutPublic>
    </>
  );

  let authed = (
    <>
      <h1>Authorised</h1>
    </>
  );

  if (authenticated) { return authed; }
  else { return unauthed; }


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