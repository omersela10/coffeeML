import { Route, Routes } from 'react-router-dom';

import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
