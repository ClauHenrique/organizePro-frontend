import { useEffect, useState } from 'react';
import './manageConflicts.css';
import { Footer, Header, MsgError, PriorityLevel } from '../importComponents';
import { createTask, getAllTaskService, updateTask } from '../../services/task.service';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

interface Task {
  title: string;
  description: string;
  status: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  priority: number;
  _id?: string
}


const optionsFlag = {
  UPDATE: "UPDATE",
  CREATE: "CREATE"
};

Modal.setAppElement('#root'); // Define o elemento root para acessibilidade

export default function ManageConflicts() {

  const [newTask, setNewTask] = useState<Task | null>(null);
  const [errorServe, setErrorServe] = useState({show: false, msg: ''});
  const [errorUpdate, SetErrorUpdate] = useState({show: false, msg: ''});
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opt, setOpt] = useState("");
  const navigate = useNavigate()

  const getTasks = async () => {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        let { data } = await getAllTaskService(token);
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
      setErrorServe({
        show: true,
        msg: 'Ops! Aconteceu algum problema :-('
      })
    }
  };


  const handleTimeConflicts = async (task: any, flag: string) => {
    try {
      let token = localStorage.getItem('token');

      if (flag === "UPDATE") {
        const {_id} = task

        await updateTask(task, _id, token)
      }

      else if (flag === "CREATE") {
        await createTask(task, token)
      }

      else {
        throw new Error("a flag deve ser definida como CREATE ou UPDATE")
      }

      localStorage.removeItem('newTask')
      setIsModalOpen(false)
      navigate('/')
     
    } catch (error) {
      SetErrorUpdate({
        show: true,
        msg: `
          A tarefa que você está tentando cadastrar está em 
          conflito com o horário de uma tarefa já agendada
          `})
    }
  }

  const getNewTask = () => {
    const newTaskStorage = localStorage.getItem('newTask');
    if (newTaskStorage) {
   
      const taskObj = JSON.parse(newTaskStorage)

      taskObj.startDate = new Date(taskObj.startDate).toLocaleString()
      taskObj.endDate = new Date(taskObj.endDate).toLocaleString()

      setNewTask(taskObj);
    }
  };

  useEffect(() => {
    getNewTask();
    getTasks();
  }, []);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <Header />
      <div className='main-manage-conflict'>
        {!newTask || errorServe.show ? (
          <MsgError msgs={[errorServe.msg]} />
        ) : (
          <div className="manage-conflicts-container">
            <h2>
              Selecione uma Tarefa e Modifique seu Horário como Desejar
            </h2>

            <div className="task-card" onClick={() => {
              setOpt(optionsFlag.CREATE)
              openModal(newTask)}
            }>
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
                onClick={() => {
                  setOpt(optionsFlag.UPDATE)
                  openModal(task)}
                }
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

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Atualizar Tarefa"
          className="modal"
          overlayClassName="modal-overlay"
        >
          {selectedTask && (
            <div id='modal-form-container'>
              {
                errorUpdate?
                <MsgError msgs={[errorUpdate.msg]} />
                : null
              }
              <form id="modal-form">
                <h2>Alterar Horario</h2>
                <span><strong>Título: </strong>{selectedTask.title}</span>
               
                <div id='date-time-inputs-modal'>
                  <div className="modal-date-input">
                    <label htmlFor="startDate">Início da Tarefa</label>
                    <input
                      type="datetime-local"
                      id="start-date-modal"
                      value={selectedTask.startDate}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          startDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="modal-date-input">
                    <label htmlFor="endDate">Término da Tarefa</label>
                    <input
                      type="datetime-local"
                      id="end-date-modal"
                      value={selectedTask.endDate}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          endDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <button 
                  onClick={() => handleTimeConflicts(selectedTask, opt)}
                  type="button" 
                  id='form-button-modal'>
                  Atualizar
                </button>
               
              </form>
            </div>
          )}
        </Modal>
      </div>

      <Footer />
    </div>
  );
}
