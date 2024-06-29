import { api } from "./api";
import { Task } from "./types/tasks";

export async function getTaskService(token: string | any) {
    return await api.get('/task', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}