import './mesage.css'

export default function LoginError(props: {msgs: string[]}) {
    console.log("AAAAA: ", props.msgs);
    
     return (
        <div id='login-error'>
            {props.msgs.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    )
}