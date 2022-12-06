import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Dashboard from './pages/Dashboard';
import Integrations from './pages/Integrations'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/integrations' element={<Integrations />} />
      </Routes>
    </Layout>
  );
}

export default App;
