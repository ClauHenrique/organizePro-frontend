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
      description: 'Descrição da Tarefa 1', 
      startDate: '01/06/2024' ,
      level: 3
    },
    { title: 'Tarefa 2', 
      status: 'Pendente', 
      description: 'Descrição da Tarefa 2', 
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

                    <div className="task-content-left">
                      <h3>{task.description}</h3>
                      <PriorityLevel level={task.level} />
                    </div>

                    <div className="task-content-right">
                      <div className="dates">
                      <span>{task.startDate}</span>
                      <br />
                      a
                      <br />
                      <span>{task.startDate}</span>
                      </div>

                      <select name="task-management">
                        <option value="">Concluir tarfa</option>
                        <option value="">Alterar tarefa</option>
                        <option value="">apagar tarfa</option>
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
