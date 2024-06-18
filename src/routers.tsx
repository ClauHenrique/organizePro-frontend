import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/home/home';
import About from './screens/about';

// import Documentacao from './Documentacao';
// import Login from './Login';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        {/* <Route path="/documentacao" element={<Documentacao />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}
