import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/home/home';
import About from './screens/about';
import Login from './screens/login/login';
import Register from './screens/register/register';
import TaskForm from './screens/task-form/taskForm';

// import Documentacao from './Documentacao';
// import Login from './Login';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/task-form" element={<TaskForm />} />        
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Router>
  );
}
