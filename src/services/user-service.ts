import { api } from "./api";

type LoginBody = {
    email: string;
    password: string
}

type User = {
    name: string;
    email: string;
    password: string
}

export async function authService(login: LoginBody) {
    return await api.post('/auth/login', login)
}

export async function registerService(user: User) {
    return await api.post('/user', user)
}