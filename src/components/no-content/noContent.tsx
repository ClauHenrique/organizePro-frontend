import './noContent.css'

export default function NoContent() {
    
     return (
        <div id='no-content'>
             <img src="/public/pasta-vazia.png" alt="Logo de pasta vazia" id="no-content-icon" />
             <p className='opaque-ft-70'>Você ainda não possui tarefas cadastradas.</p>
             <p className='opaque-ft-70'>Faça login ou cadastre-se para gerenciar as suas tarefas.</p>
        </div>
    )
}