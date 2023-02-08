import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Pireps from './components/Pireps';
import { Stack } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Stack gap={6}>
          <div className="container">
            <Pireps />
            {/* <Routes>
              <Route path="/pireps" element={<Pireps />} /> // working

              <Route exact path="/add" component={AddUser} />
              <Route path="/users/:id" component={User} />
              </Routes> */}
          </div>
        </Stack>
      </div>
    </BrowserRouter>
  );
}

export default App;
