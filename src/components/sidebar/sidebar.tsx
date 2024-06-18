import './sidebar.css';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar" id='sidebar'>
      <Link to="/" className="sidebar-link">
      <abbr title="Ver tarefas cadastradas">
        <img src="/public/registro.png" alt="Logo do OrganizePro" className="menu-icons" />
        </abbr>
      </Link>
      <Link to="/sobre" className="sidebar-link">
       <abbr title="Estatisticas">
            <img src="/public/progressao-grafica.png" alt="Logo do OrganizePro" className="menu-icons" />
        </abbr>
      </Link>
    </aside>
  );
}
