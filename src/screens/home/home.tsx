import { useState } from 'react';
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import './home.css'; // Importe o arquivo CSS com os estilos da página
import PriorityLevel from '../../components/priority-level/priorityLevel';

export default function Home() {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index: any) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  const tasks = [
    { 
      title: 'Tarefa 1', 
      status: 'Concluída', 
      description: 'Descrição da Tarefa 1 diewdj edejd e deiedj ededje9d9ejd e dejd9ed  e de dejd9edje9djed edje9dje9dj', 
      startDate: '01/06/2024' ,
      level: 3
    },
    { title: 'Tarefa 2', 
      status: 'Pendente', 
      description: 'Descrição da Tarefa 2 9ejd e dejd9ed  e de dejd9edje9djed edje9dje9dj',
      startDate: '05/06/2024',
      level: 4
    },
  ];

  return (
    <div className="page-container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="task-list-container">
          <div className="task-list-header">
            <div className="header-text-left">Tarefas cadastradas</div>
            <div className="header-text-right">Status</div>
          </div>
          <hr className="header-divider" />
          <div className="task-list">
            {tasks.map((task, index) => (
              <div key={index}>
                <div className="task-item" onClick={() => toggleExpand(index)}>
                  <div className="task-title">{task.title}</div>
                  <div className="task-status">{task.status}</div>
                </div>
                {expandedItem === index && (
                  <div className="task-expanded">

                    <div className="task-content-row-1">
                      <div id='task-description'>
                        <span className='task-labels'>Descrição</span>
                        <p className='opaque-ft-70'>{task.description}</p>
                      </div>

                      <div id='dates'>
                        <span className='task-labels'>Iniciar tarefa</span>
                        <span className="opaque-ft-70">{task.startDate}</span>
                        <span className='task-labels'>Concluir tarefa</span>
                        <span className="opaque-ft-70">{task.startDate}</span>
                      </div>
                    </div>

                    <div className="task-content-row-2">
                      <div id="Priority-level">
                      <span className='task-labels'>Prioridade da tarefa</span>
                        <PriorityLevel 
                          level={task.level}
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
    </div>
  );
}
