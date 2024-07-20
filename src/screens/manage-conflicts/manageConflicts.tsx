import { useEffect, useState } from 'react';
import './manageConflicts.css';
import { Header, MsgError, PriorityLevel } from '../importComponents';
import { getTaskService } from '../../services/task.service';
import ModalUpdateDelete from '../../components/modal-update-delete/Modal';

interface NewTask {
  title: string;
  description: string;
  status: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  priority: number;
}

export default function ManageConflicts() {
  const [newTask, setNewTask] = useState<NewTask | any>(null);
  const [showErrorMsg, SetshowErrorMsg] = useState(false);
  const [tasks, setTasks] = useState<NewTask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTasks = async () => {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        let { data } = await getTaskService(token);
        if (data.length > 0) {
          data = data.map((ele: any) => ({
            ...ele,
            startDate: new Date(ele.startDate).toLocaleString(),
            endDate: new Date(ele.endDate).toLocaleString(),
          }));
          setTasks(data);
        }
      }
    } catch (error) {
      SetshowErrorMsg(true);
    }
  };

  const getNewTask = () => {
    const newTaskStorage = localStorage.getItem('newTask');
    if (newTaskStorage) {
      setNewTask(JSON.parse(newTaskStorage));
    }
  };

  const openModal = () => {
     // setSelectedTask(task);
     setIsModalOpen(true);
   };

  useEffect(() => {
    getNewTask();
    getTasks();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {!newTask || showErrorMsg ? (
          <MsgError msgs={['Ops! Aconteceu algum problema :-(']} />
        ) : (
          
          <div className="manage-conflicts-container">


          <ModalUpdateDelete isModalOpen={isModalOpen} />
            
            <h2 className="opaque-ft-70">
              Escolha uma Tarefa e Modifique seu Horário como Desejar
            </h2>
            <div className="task-card" onClick={() => openModal()}>
              <h3 id="title-new-task">Tarefa Nova</h3>
              <p>
                <strong>Título:</strong>{' '}
                <span className="opaque-ft-70">{newTask.title}</span>
              </p>
              <p>
                <strong>Descrição:</strong>{' '}
                <span className="opaque-ft-70">{newTask.description}</span>
              </p>
              <p>
                <strong>Data de Início:</strong>{' '}
                <span className="opaque-ft-70">{newTask.startDate}</span>
              </p>
              <p>
                <strong>Data de Fim:</strong>{' '}
                <span className="opaque-ft-70">{newTask.endDate}</span>
              </p>
              <div>
                <strong>Prioridade:</strong>
                <PriorityLevel level={newTask.priority} />
              </div>
            </div>

            {tasks.map((task, index) => (
              <div
                key={index}
                className="task-card"
                onClick={() => openModal()}
              >
                <p>
                  <strong>Título:</strong>{' '}
                  <span className="opaque-ft-70">{task.title}</span>
                </p>
                <p>
                  <strong>Descrição:</strong>{' '}
                  <span className="opaque-ft-70">{task.description}</span>
                </p>
                <p>
                  <strong>Data de Início:</strong>{' '}
                  <span className="opaque-ft-70">{task.startDate}</span>
                </p>
                <p>
                  <strong>Data de Fim:</strong>{' '}
                  <span className="opaque-ft-70">{task.endDate}</span>
                </p>
                <div>
                  <strong>Prioridade:</strong>
                  <PriorityLevel level={task.priority} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
