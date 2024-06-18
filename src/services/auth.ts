import { api } from "./api";

type loginBody = {
    email: string;
    passord: string
}

export default async function authService(login: any) {
    const res = await api.post('/auth/login', {
        login
    })

    return res
}