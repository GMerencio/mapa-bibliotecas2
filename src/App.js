import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PaginaMapa } from './components/PaginaMapa';
import { Painel } from './components/Painel';
import PaginaIes from './components/PaginaIes';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaMapa />} />
          <Route path="/pagina-ies/:id" element={<PaginaIes />} />
          <Route path="/painel" element={<Painel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;