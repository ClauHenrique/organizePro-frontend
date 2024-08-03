import { useEffect, useState } from 'react';
import { deleteTaskService, getTaskService, updateTaskStatus } from '../../services/task.service';
import './home.css';
import  { Header, PriorityLevel, MsgError, NoContent, Footer } from '../importComponents';
import { TaskStatus } from '../../services/types/tasks';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  let token = localStorage.getItem('token')

  const task = [
    { 
      _id: '',
      title: '', 
      status: '', 
      description: '', 
      startDate: '' ,
      endDate: '',
      priority: 0
    }
  ];

  const [showNoContent, setShowNoContent] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [tasks, setTasks] = useState(task);
  const [errorMsg, setErrorMsg] = useState({msg: '', show: false});
  const navigate = useNavigate()


  const toggleExpand = (index: any) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };


  const getTasks = async (filterStatus?: string) => {
      try {

        if (token) {

          let {data} = await getTaskService(token, filterStatus)
         
          if (data.length > 0) {

            data.map((ele: any) => {
              ele.startDate = new Date(ele.startDate).toLocaleString()
              ele.endDate = new Date(ele.endDate).toLocaleString()
            })
            
  
            setTasks(data) 
          } 

          else {
            setTasks(task)
          }
        }

        else {
          setShowNoContent(true)
        }
        
      } catch (error: any) {

        setErrorMsg({
          msg: "Estamos com algum erro no servidor. Não foi possivel obter as tarefas!",
          show: true
        })        

        if (error.response.status == 401) {
          localStorage.removeItem('token')
        }

      }
  }

  const filterTaskStatus = (event: any) => {

    const filter = event.target.value

    getTasks(filter)
  }

  const taskManagement = async (id: string, event: any) => {
    try {

      const newStatus = event.target.value;

      switch (newStatus) {
        case TaskStatus.FAZENDO:
          await updateTaskStatus(
            {status: TaskStatus.FAZENDO},
             id,
             token
            )
            window.location.reload()
          break;
        
        case TaskStatus.CONCLUIDA:
          await updateTaskStatus(
            {status: TaskStatus.CONCLUIDA},
            id,
              token
            )
            window.location.reload()
          break;

        case 'modificar':
          localStorage.setItem('idTaskUpdate', JSON.stringify(id));
          navigate('/update-task')
          break

        case 'apagar':
          await deleteTaskService(token, id)
          window.location.reload()
          break;
      }


    } catch (error) {
      
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
            errorMsg.show? <MsgError msgs={[errorMsg.msg]} /> : null
        }

        {
          showNoContent?
            <NoContent />

            :
                  
            <div>
              <div id='task-list-container-home'>
               
              <select id='filter-task'
                 onChange={(event) => 
                  filterTaskStatus(event)}>
                <option className='opaque-ft-70' value="a fazer" selected>a fazer</option>
                <option className='opaque-ft-70' value="fazendo">fazendo</option>
                <option className='opaque-ft-70' value="concluida">concluida</option>

              </select>

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
                          
                            <select 
                              name="task-management" id='task-management' 
                              onChange={(event) => 
                                taskManagement(task._id, event)}>
                              <option className='opaque-ft-70' value="" disabled selected hidden>Gerenciar tarefa</option>
                              <option className='opaque-ft-70' value="fazendo">Marcar como iniciada</option>
                              <option className='opaque-ft-70' value="concluida">Marcar como concluida</option>
                              <option className='opaque-ft-70' value="modificar">Modificar tarefa</option>
                              <option className='opaque-ft-70' value="apagar">Apagar tarfa</option>
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
