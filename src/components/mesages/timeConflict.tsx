import './mesage.css'

export default function TimeConflict(props: {msg: string}) {
    
     return (
        <div id='msg-error'>
            <p>{props.msg}</p>
            <a href="/manage-conflicts">Gerenciar Conflitos</a>
        </div>
    )
}