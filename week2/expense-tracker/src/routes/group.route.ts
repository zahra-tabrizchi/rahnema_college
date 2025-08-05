import { Router } from "express"
import { users, User } from "./user.route"
import { createGroupDto } from "../modules/group/dto/create-group.dto"
import { handleExpress } from "../utility/handle-express"
import { createGroup } from "../modules/group/create-group"
import { ZodError } from "zod"

export interface Group {
    id : number,
    name : string,
    memberIds : number[],
}

export const groups: Group[] = []

export const app = Router()

app.post("/", (req, res) => {
    try {
        const dto = createGroupDto.parse(req.body);
        handleExpress(res, () => createGroup(dto))
    } catch (e) {
        if(e instanceof ZodError) {
            res.status(400).send({message: e.issues })
        }
    }
})
