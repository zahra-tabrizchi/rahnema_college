import { Router } from "express"
import { createGroupDto } from "../modules/group/dto/create-group.dto"
import { handleExpress } from "../utility/handle-express"
import { createGroup } from "../modules/group/create-group"
import { getUserExpenses } from "../modules/expense/get-user-expenses"
import { ZodError, z } from "zod"
import { getUserDebts } from "../modules/expense/get-user-debt"

export interface Expense {
    id : number,
    description : string,
    groupId: number,
    userId : number,
    amount: number,

}

export const expenses: Expense[] = []

export const app = Router()

app.post("/", (req, res) => {
    try {
        const dto = createGroupDto.parse(req.body)
        handleExpress(res, () => createGroup(dto))
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).send({message: e.issues})
        }
    }
})

app.get("/made/:id", (req, res) => {
    try {
        const id = z.coerce.number().parse(req.params.id);
        handleExpress(res, () => getUserExpenses(id))
    } catch (e) {
        if(e instanceof ZodError) {
            res.status(400).send({message: e.issues })
        }
    }
}) 

app.get("/for/:id", (req, res) => {
    try {
        const id = z.coerce.number().parse(req.params.id);
        handleExpress(res, () => getUserDebts(id))
    } catch (e) {
        if(e instanceof ZodError) {
            res.status(400).send({message: e.issues })
        }
    }
}) 

