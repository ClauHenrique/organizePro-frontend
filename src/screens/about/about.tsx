import { Link } from 'react-router-dom';
import { Footer, Header } from '../importComponents';
import './about.css'

export default function About() {
    return (
        <div>
            <Header />

           <div id="main-about">
            <p id='text-about' className='opaque-ft-50 font-default'>
                    Este é o frontend de um projeto backend desenvolvido por 
                    Cláudio Henrique. A documentação e os detalhes sobre as tecnologias 
                    empregadas, bem como as implementações das funcionalidades, 
                    podem ser encontrados na documentação do projeto:  
                    <Link
                        to="https://github.com/ClauHenrique/organizePro-backend/tree/main/docs" 
                        className="about-links"
                        target='_blank'
                        rel="noopener noreferrer"
                        > Documentação
                    </Link>.
                </p>

            <div className="circle-container">
            <img src="/eu.png" alt="Meu perfil" id="img-profile" />

            <ul>
                <li className="info ft-weight-600">Claudio Henrique</li>
                <li className="info ft-weight-600">Desenvolvedor Backend</li>
                <br />
                <li className="info">
                <Link 
                    to="https://github.com/ClauHenrique/" 
                    className="about-links"
                    target='_blank'
                    rel="noopener noreferrer"
                    >GitHub
                  </Link>
                </li>
                <li className="info">
                <Link 
                    to="https://www.linkedin.com/in/claudio-henrique-8047a7266/" 
                    className="about-links"
                    target='_blank'
                    rel="noopener noreferrer"
                    >Linkedin
                  </Link>
                </li>
            </ul>

            </div>

           </div>
            <Footer />
        </div>
    )
}