import React, { useEffect, useState } from 'react';
import './updateTask.css';
import { Header, Footer, TimeConflict, MsgError } from '../importComponents';
import MsgSucess from '../../components/mesages/msgSuccess';
import { Task } from '../../services/types/tasks';
import { getOneTaskService, updateTask } from '../../services/task.service';
import { validateDateFields } from '../../services/validations.service';

export default function UpdateTask() {
    const [task, setTask] = useState<Task | any>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());
    const [priority, setPriority] = useState(1);

    const [msgError, setMsgError] = useState({msg: "", show: false})
    const [showMsgConflict, setShowMsgConflict] = useState(false);
    const [showMsgSucess, setshowMsgSucess] = useState(false);

    let token = localStorage.getItem('token');
    

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            validateDateFields(
                startDate, 
                endDate,  
                {
                    lowerStart: true // a data de inicio pode ser inferior a data de agora
            })                       // o usuario pode estar atualizando uma tarefa que ja está em andamento
    
           } catch (error: any) {
    
                document.getElementsByClassName
                setMsgError({msg: error.message, show: true})
                window.scrollTo(0, 0);
            
                setTimeout(() => {
                    setMsgError({msg: "", show: false})
            }, 5000)
    
            return
            
           }    

        
        try {

            const {_id } = task

            const t: Task = {
                title,
                description,
                startDate,
                endDate,
                priority
            }
            

            const up = await updateTask(t, _id, token)

            
            if (up.status === 200) {
                console.log(up);
                
                setTimeout(() => {
                    setshowMsgSucess(false);
                }, 3000);

                setShowMsgConflict(false);
                setshowMsgSucess(true);
                window.scrollTo(0, 0);
            }

            localStorage.removeItem('idTaskUpdate')

        } catch (error: any) {
            
            if (error.response.status === 409) {
                setShowMsgConflict(true);
                localStorage.removeItem('idTaskUpdate')
            }
            
            window.scrollTo(0, 0);
        }
    };

    const getTask = async () => {
        const idTaskLocalStorage = localStorage.getItem('idTaskUpdate');
        

        if (idTaskLocalStorage) {            
            
            const taskId = JSON.parse(idTaskLocalStorage);
            

            const {data} = await getOneTaskService(token, taskId)

            setTask(data);
            setTitle(data.title);
            setDescription(data.description);
            

            data.startDate = new Date(data.startDate)
            data.startDate.setHours(data.startDate.getHours() - 3)
            setStartDate(new Date(data.startDate).toISOString().slice(0, 16));

            data.endDate = new Date(data.endDate)
            data.endDate.setHours(data.endDate.getHours() - 3)
            setEndDate(new Date(data.endDate).toISOString().slice(0, 16));
            setPriority(data.priority);
            
        }
    }

    useEffect(() => {
       getTask()
    }, []);

    return (
        <div>
            <Header />

            {showMsgConflict ? <TimeConflict /> : null}

            {msgError ? <MsgError msgs={[msgError.msg]} /> : null}

            {showMsgSucess ? <MsgSucess msg="Tarefa Modificada" /> : null}

            <div className="task-form-container">
                <form className="task-form" onSubmit={handleUpdate}>
                    <h2>Modificar tarefa</h2>
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label htmlFor="startDate">Início da Tarefa</label>
                    <input
                        type="datetime-local"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />

                    <label htmlFor="endDate">Término da Tarefa</label>
                    <input
                        type="datetime-local"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />

                    <label htmlFor="priority">Nível de Prioridade</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        required
                    >
                        <option value={1}>Baixa</option>
                        <option value={2}>Média</option>
                        <option value={3}>Alta</option>
                        <option value={4}>Urgente</option>
                        <option value={5}>Crítica</option>
                    </select>
                    <button type="submit" className="task-form-button">Atualizar</button>
                </form>
            </div>

            <Footer />
        </div>
    );
}