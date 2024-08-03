import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/home/home';
import About from './screens/about';
import Login from './screens/login/login';
import Register from './screens/register/register';
import TaskForm from './screens/task-form/taskForm';
import ManageConflicts from './screens/manage-conflicts/manageConflicts';
import UpdateTask from './screens/update-task/updateTask';
import NotFound from './screens/not-found/notFound';
import { CheckAuthenticity } from './services/checkAuthenticity';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/task-form" element={<CheckAuthenticity><TaskForm /></CheckAuthenticity>} />        
        <Route path="/sobre" element={<CheckAuthenticity><About /> </CheckAuthenticity>} />
        <Route path="/manage-conflicts" element={<CheckAuthenticity><ManageConflicts /></CheckAuthenticity>} />
        <Route path="/update-task" element={<CheckAuthenticity><UpdateTask /> </CheckAuthenticity>} />        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
