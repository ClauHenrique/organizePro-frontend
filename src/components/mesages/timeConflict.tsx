import { Link } from 'react-router-dom'
import './mesage.css'

export default function TimeConflict(props: {msg: string}) {
    
     return (
        <div id='msg-error'>
            <p>{props.msg}</p>
            <Link 
                to="/manage-conflicts" 
                id='link-time-conflict' 
                className="opaque-ft-50"
                >Gerenciar Conflitos</Link>
        </div>
    )
}