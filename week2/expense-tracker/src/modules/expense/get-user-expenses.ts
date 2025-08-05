import { expenses } from "../../routes/expense.route"

export const getUserExpenses = (userId : number) => {
    const expensesByUser= expenses.filter((e) => e.userId === userId)
    return expensesByUser.reduce((sum, expense) => sum + expense.amount , 0)
}