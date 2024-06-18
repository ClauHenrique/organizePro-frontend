import Header from '../../components/header/header';
import './login.css';
import authService from '../../services/auth';

export default function Login() {

    const auth = async () => {
        const a = await authService({email: "john@gmail.com", password: "123456"}
        )
        console.log(a);
        
    }
  return (
    <div>
        <Header />
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" />
                <a href="/create-account" className="create-account-link">Criar conta</a>
                <button className="login-button">Login</button>
            </div>
        </div>
    </div>
  );
}
