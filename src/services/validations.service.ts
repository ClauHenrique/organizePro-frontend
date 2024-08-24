
// validar o campo de data-hora
export function validateDateFields(startDate: any, endDate: any) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    if (end <= start) {
        throw new Error(`
            A data de finalização da tarefa não pode ser inferior ou igual a data de início`)
    }


    // dar um desconto de 2 minuto para evitar que o usuario obtenha erros ao 
    // tentar cadastrar uma tarefa no horario de agora 

    start.setMinutes(start.getMinutes() + 2)
    
    if (start < now) {
        throw new Error(`A data de início não pode ser inferior a data de agora`)
    }

} 
