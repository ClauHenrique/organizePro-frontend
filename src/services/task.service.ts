import { api } from "./api";
import { Task, TaskStatus, UpdateTaskStatus } from "./types/tasks";

export async function getTaskService(token: string | any, filter?: string) {
    return await api.post('/task/findall', 
        {status: filter? filter : TaskStatus.AFAZER },
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function getAllTaskService(token: string) {
    return await api.get('/task', 
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


export async function getOneTaskService(token: string | any, taskId: string) {
    return await api.get(`/task/${taskId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


export async function deleteTaskService(token: string | any, taskId: string) {
    return await api.delete(`/task/${taskId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}



export async function createTask(task: Task, token: string | any) {
    return await api.post('/task', 
        task,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function updateTask(task: Task | null, id: string | any, token: string | any) {
    return await api.patch(`/task/${id}`, 
        task,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

    export async function updateTaskStatus(status: UpdateTaskStatus, id: string, token: string | any) {
        return await api.patch(`/task/${id}`, 
            status,
            {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}