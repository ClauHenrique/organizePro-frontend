import React, { useState } from 'react';
import './taskForm.css';
import { Header, Footer, TimeConflict } from '../importComponents';
import { createTask } from '../../services/task.service';
import MsgSucess from '../../components/mesages/msgSuccess';

export default function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [priority, setPriority] = useState(1);
    const [showMsgError, setshowMsgError] = useState(false);
    const [showMsgSucess, setshowMsgSucess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let token = localStorage.getItem('token');
        
        try {
            
            const create = await createTask({
                title,
                description,
                startDate: `${startDate}T${startTime}`,
                endDate: `${endDate}T${endTime}`,
                priority
            },
            token
            );

            if (create.status === 201) {
                setTimeout(() => {
                    setshowMsgSucess(false);
                }, 3000);

                setshowMsgError(false);
                setshowMsgSucess(true);
                window.scrollTo(0, 0);
            }

        } catch (error: any) {
            if (error.response.status === 409) {
                setshowMsgError(true);
            }
            
            window.scrollTo(0, 0);
        }
    };

    return (
        <div>
            <Header />

            {showMsgError ? (
                <TimeConflict
                    msg={
                        `A tarefa que você está tentando cadastrar está em conflito com o horário de uma tarefa já agendada`
                    }
                />
            ) : null}

            {showMsgSucess ? <MsgSucess msg="Tarefa Cadastrada" /> : null}

            <div className="task-form-container">
                <form className="task-form" onSubmit={handleSubmit}>
                    <h2>Cadastrar Tarefa</h2>
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
                    <div className="date-time-inputs">
                        <div className="date-input">
                            <label htmlFor="startDate">Início da Tarefa</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="time-input">
                            <label htmlFor="startTime">Horário de Início</label>
                            <input
                                type="time"
                                id="start-time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="date-time-inputs">
                        <div className="date-input">
                            <label htmlFor="endDate">Término da Tarefa</label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="time-input">
                            <label htmlFor="endTime">Horário de Término</label>
                            <input
                                type="time"
                                id="end-time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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
                    <button type="submit" className="task-form-button">Cadastrar</button>
                </form>
            </div>

            <Footer />
        </div>
    );
}
