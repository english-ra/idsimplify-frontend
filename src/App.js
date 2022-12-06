import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Integrations from './pages/Integrations'

function App() {
  return (
    <Routes>
      <Route path='/' />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/integrations' element={<Integrations />} />
    </Routes>
  );
}

export default App;
