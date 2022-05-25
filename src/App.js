import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PaginaMapa } from './components/PaginaMapa';
import { TesteBack } from './components/TesteBack';
import PaginaIes from './components/PaginaIes';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TesteBack />} />
          <Route path="/mapa" element={<PaginaMapa />} />
          <Route path="/ies/:id" element={<PaginaIes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;