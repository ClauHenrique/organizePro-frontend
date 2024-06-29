import Header from '../../components/header/header';
import './login.css';
import {authService} from '../../services/user-service';
import { useState } from 'react';
import MsgError from '../../components/mesages/msg-error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorMsg, SetshowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
      };
    
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const auth = async () => {
        try {
            if (!email || ! password) {
                SetshowErrorMsg(true)
                setErrorMsg("Os campos email e senha são obrigatorios")
                return
            }

            const req = await authService({email, password})

            if (req.status == 200) {
                SetshowErrorMsg(false)
                localStorage.setItem('token', req.data.access_token);
            
                navigate('/')
            }
        } catch (error: any) {
            SetshowErrorMsg(true)
        
            if (error.response.status == 401) {
                SetshowErrorMsg(true)
                setErrorMsg("email ou senha incorreto")
            }
            
        }
        
    }
  return (
    <div>
        <Header />
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                {
                    showErrorMsg? <MsgError msgs={[errorMsg]} /> : null
                }
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
                <a href="/create-account" className="create-account-link">Criar conta</a>

                <button 
                    type='button'
                    className="login-button"
                    onClick={auth}
                    >Login</button>
            </div>
        </div>
    </div>
  );
}
