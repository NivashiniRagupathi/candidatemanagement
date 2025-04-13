import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateManager from './components/CandidateManager/CandidateManager';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateManager />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
