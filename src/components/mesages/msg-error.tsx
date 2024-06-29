import './mesage.css'

export default function MsgError(props: {msgs: string[]}) {
    
     return (
        <div id='msg-error'>
            {props.msgs.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    )
}