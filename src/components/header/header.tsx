import { useEffect, useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom'; // Supondo que você esteja usando react-router-dom para roteamento

export default function Header() {
  const [isAuthenticated, setAuthenticated] = useState(false);


  const getLoginStatus = () => {
    localStorage.getItem('token')? setAuthenticated(true) : setAuthenticated(false)
  }

  const signOut = () => {
    localStorage.removeItem('token')
    getLoginStatus()    
  }

  useEffect(() => {
    getLoginStatus()
  }, [])

  return (
    <header className="header" id='header'>
      <div className="left">
        <Link to="/">
          <img src="/logo.png" alt="Logo do OrganizePro" id="icon" />
        </Link>
      </div>

      <nav className="nav">
        <Link to="/sobre" className="header-links opaque-ft-50">Sobre</Link>
        <Link 
          to="/task-form" 
          className="header-links opaque-ft-50"
          rel="noopener noreferrer"
          >Cadastrar</Link>

        <Link 
          to="#" 
          className="header-links opaque-ft-50"
          rel="noopener noreferrer"
        >Estatisticas</Link>
      </nav>

      <div className="right">
        {
          isAuthenticated ?
          <Link
            onClick={signOut}
            to="/" className="header-links opaque-ft-50">Sair</Link>
          :
          <Link to="/login" className="header-links opaque-ft-50">Login</Link>
        }
      </div>
    </header>
  );
}
