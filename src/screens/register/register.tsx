import Header from '../../components/header/header';
import './register.css';
import { useState } from 'react';
import LoginError from '../../components/mesages/login-error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../../services/user-service';


export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorMsg, SetshowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState(['']);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const register = async () => {
        try {
            if (!name || !email || !password) {
                SetshowErrorMsg(true);
                const msg = "Todos os campos são obrigatórios"
                setErrorMsg([msg]);
                return;
            }

            const req = await registerService({
                 name, email, password 
                });

            if (req.status === 201) {
                SetshowErrorMsg(false);
                navigate('/login');
            }
        } catch (error: any) {
            SetshowErrorMsg(true);

            if (error.response.status === 400) {
                SetshowErrorMsg(true);
                const msgs: string[] = error.response.data.message // array de mensagens
                setErrorMsg(msgs);
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <div className="login-card">
                    <h2>Cadastro</h2>
                    {showErrorMsg && <LoginError msgs={errorMsg} />}
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="password">Senha</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye} 
                            onClick={toggleShowPassword} 
                            className="password-toggle-icon"
                        />
                    </div>
                    <button 
                        type='button'
                        className="login-button"
                        onClick={register}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
}
