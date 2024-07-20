import { api } from "./api";
import { Task } from "./types/tasks";

export async function getTaskService(token: string | any) {
    return await api.get('/task', {
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

export async function updateTask(task: Task, id: string, token: string | any) {
    return await api.patch(`/task/${id}`, 
        task,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}