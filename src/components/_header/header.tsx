import { useState, useEffect, useRef } from 'react';
import './header.css';

type HeaderProps = {
  userName?: string;
};

export default function Header(props: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="left">
        <a href="#">
          <img src="/public/logo.png" alt="Logo" className="icon" />
        </a>
      </div>
      <nav className="nav">
        <a href="/sobre" className="link opaque-ft">Sobre</a>
        <a href="/documentacao" className="link opaque-ft">Documentação</a>
        <a href="https://github.com" className="link opaque-ft">GitHub</a>
      </nav>
      <div className="right">
        <img 
          src="/public/usuario-de-perfil.png" 
          alt="User Profile" 
          id="profile-icon" 
          onClick={toggleMenu} 
        />
        {
          isMenuOpen && (
            <div id='dropdown-profile' ref={dropdownRef}>
              {props.userName && <span>{props.userName}</span>}
              <button type='button'>Login</button>
            </div>
          )
        }
      </div>
    </header>
  );
}
