import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Radar from './pages/Radar';
import Factory from './pages/Factory';
import Monitor from './pages/Monitor';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/radar" element={<Radar />} />
          <Route path="/factory" element={<Factory />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/distribution" element={
            <div className="text-center py-20">
              <h2 className="text-xl text-slate-400">Distribution Hub</h2>
              <p className="text-slate-500 mt-2">API connections to WordPress and Toutiao coming in Phase 2.</p>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
