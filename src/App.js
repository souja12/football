
import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Matches from './Matches';
import Players from './Players';
import News from './News';
import Heilights from './Heilights';


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/players" element={<Players />} />
          <Route path="/news" element={<News />} />
          <Route path="/highlights" element={<Heilights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;