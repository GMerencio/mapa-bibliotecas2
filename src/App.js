import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PaginaMapa } from './components/PaginaMapa';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaMapa />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
