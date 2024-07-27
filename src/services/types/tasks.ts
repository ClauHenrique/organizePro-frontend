export type Task = {
    title: string;
    description: string;
    startDate: string
    endDate: string
    priority: number
}


export enum TaskStatus {
    CONCLUIDA = 'concluida',
    FAZENDO = 'fazendo'
}


export type UpdateTaskStatus = {
    status: TaskStatus
}