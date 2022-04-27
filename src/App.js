import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Mapa } from './pages/Mapa';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/mapa-bibliotecas" element={<Mapa />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
