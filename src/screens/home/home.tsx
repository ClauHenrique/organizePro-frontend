import { useEffect, useState } from 'react';
import { getTaskService } from '../../services/task.service';
import './home.css';
import  { Header, PriorityLevel, MsgError, NoContent, Footer } from '../importComponents';

export default function Home() {

  const task = [
    { 
      title: '', 
      status: '', 
      description: '', 
      startDate: '' ,
      endDate: '',
      priority: 0
    }
  ];

  const [showErrorMsg, SetshowErrorMsg] = useState(false);
  const [showNoContent, setShowNoContent] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);
  const [tasks, setTasks] = useState(task);

  const toggleExpand = (index: any) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };


  const getTasks = async () => {
      try {

        let token = localStorage.getItem('token')
        

        if (token) {

          let {data} = await getTaskService(token)
         
          if (data.length > 0) {
            setShowNoContent(false)

            data.map((ele: any) => {
              ele.startDate = new Date(ele.startDate).toLocaleString()
              ele.endDate = new Date(ele.endDate).toLocaleString()
            })
            
  
            setTasks(data) 
          } 
        }

        else {
          setShowNoContent(true)
        }
        
      } catch (error: any) {

        if (error.response.status == 401) {
          localStorage.removeItem('token')
        }

        else {

          setErrorMsg("Estamos com algum erro no servidor. Não foi possivel obter as tarefas!")
          SetshowErrorMsg(true)
        }
      }
  }

  useEffect(() => {
        getTasks()
  }, [])


  return (
    <div>
      <Header />

      <div className="main-home">
        {
            showErrorMsg? <MsgError msgs={[errorMsg]} /> : null
        }

        {
          showNoContent?
            <NoContent />

            :
                  
            <div>
              <div id='task-list-container-home'>
                <div id="task-list-header">
                  <div id="header-text-left">Tarefas cadastradas</div>
                  <div id="header-text-right">Status</div>
                </div>
                <hr id="header-divider" />
                <div className="task-list">
                  {tasks.map((task, index) => (
                    <div key={index}>
                      <div className="task-item" onClick={() => toggleExpand(index)}>
                        <div className="opaque-ft-70">{task.title}</div>
                        <div className="opaque-ft-70">{task.status}</div>
                      </div>
                      {expandedItem === index && (
                        <div>

                          <div className="task-content-row">
                            <div id='task-description'>
                              <span className='task-labels'>Descrição</span>
                              <p className='opaque-ft-70 task-content'>{task.description}</p>
                            </div>

                            <div id='dates'>
                              <span className='task-labels'>Iniciar tarefa</span>
                              <span className="opaque-ft-70 task-content">{task.startDate}</span>
                              <span className='task-labels'>Concluir tarefa</span>
                              <span className="opaque-ft-70 task-content">{task.endDate}</span>
                            </div>
                          </div>

                          <div className="task-content-row">
                            <div className="priority-level">
                            <span className='task-labels'>Prioridade da tarefa</span>
                              <PriorityLevel
                                level={task.priority}
                              />
                            </div>
                          
                            <select name="task-management" id='task-management'>
                              <option className='opaque-ft-70' value="" disabled selected hidden>Gerenciar tarefa</option>
                              <option className='opaque-ft-70' value="">Concluir tarfa</option>
                              <option className='opaque-ft-70' value="">Alterar tarefa</option>
                              <option className='opaque-ft-70' value="">apagar tarfa</option>
                            </select>
                          </div>

                        </div>
                      )}
                      <hr className="task-divider" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            }
          
          </div>

          <Footer />
    </div>
  );
}
