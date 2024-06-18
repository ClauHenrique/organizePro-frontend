import './header.css';
import { Link } from 'react-router-dom'; // Supondo que você esteja usando react-router-dom para roteamento

export default function Header() {

  return (
    <header className="header" id='header'>
      <div className="left">
        <Link to="/">
          <img src="/public/logo.png" alt="Logo do OrganizePro" id="icon" />
        </Link>
      </div>

      <nav className="nav">
        <Link to="/sobre" className="header-links opaque-ft-50">Sobre</Link>
        <Link to="/documentacao" className="header-links opaque-ft-50">Documentação</Link>
        <a 
          href="https://github.com/ClauHenrique/organizePro-backend" 
          className="header-links opaque-ft-50"
          target='_blank'
          rel="noopener noreferrer"
        >GitHub</a>
      </nav>

      <div className="right">
        <Link to="/login" className="header-links opaque-ft-50">Login</Link>
      </div>
    </header>
  );
}
