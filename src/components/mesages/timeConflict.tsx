import { Link } from 'react-router-dom'
import './mesage.css'

export default function TimeConflict() {
    
     return (
        <div id='msg-error'>
            <p>
                A tarefa que você está tentando cadastrar está em conflito 
                com o horário de uma tarefa já agendada
            </p>
            <Link 
                to="/manage-conflicts" 
                id='link-time-conflict' 
                className="opaque-ft-50"
                >Gerenciar Conflitos</Link>
        </div>
    )
}