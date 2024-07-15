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
                    to="https://github.com/ClauHenrique/organizePro-backend/tree/main/docs" 
                    className="header-links opaque-ft-50"
                    target='_blank'
                    rel="noopener noreferrer"
                    >Documentação
                  </Link>
                </li>
                <li>
                  <Link 
                    to="https://github.com/ClauHenrique/organizePro-backend" 
                    className="header-links opaque-ft-50"
                    target='_blank'
                    rel="noopener noreferrer"
                    >GitHub
                  </Link>
                </li>
            </ul>
        </footer>
    );
}
