import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <ul className="footer-links">
                <li>
                  <Link to="/sobre" className="header-links opaque-ft-50">Sobre</Link>
                </li>
                <li>
                  <Link 
                    to="https://github.com/ClauHenrique/" 
                    className="header-links opaque-ft-50"
                    target='_blank'
                    rel="noopener noreferrer"
                    >GitHub
                  </Link>
                </li>
                <li>
                <p className='opaque-ft-50'>&#169; 2024 - Cláudio Henrique</p>
              </li>
            </ul>
        </footer>
    );
}
