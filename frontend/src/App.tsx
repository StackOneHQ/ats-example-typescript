import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ViewJob from './pages/ViewJobs';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/view-job/:jobId" element={<ViewJob />} /> 
      </Routes>
    </Router>
  );
};

export default App;