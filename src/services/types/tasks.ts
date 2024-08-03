export type Task = {
    title: string;
    description: string;
    startDate: string
    endDate: string
    priority: number
}


export enum TaskStatus {
    CONCLUIDA = 'concluida',
    FAZENDO = 'fazendo',
    AFAZER = 'a fazer'
}


export type UpdateTaskStatus = {
    status: TaskStatus
}