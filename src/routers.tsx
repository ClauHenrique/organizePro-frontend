import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/home/home';
import About from './screens/about';
import Login from './screens/login/login';
import Register from './screens/register/register';

// import Documentacao from './Documentacao';
// import Login from './Login';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/sobre" element={<About />} />
        {/* <Route path="/documentacao" element={<Documentacao />} />
         */}
      </Routes>
    </Router>
  );
}
