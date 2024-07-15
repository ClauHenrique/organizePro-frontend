import './mesage.css'

export default function MsgSucess(props: {msg: string}) {
    
     return (
        <div id='msg-sucess'>
            <p>{props.msg}</p>
        </div>
    )
}