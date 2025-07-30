import { Router, Response } from "express";
import { users, User } from "./user.route";
import { isNonEmptyString } from "../utility/non-empty-string";
import { HttpError } from "../utility/http-error";
import { handleExpress } from "../utility/handle-express";
import { createPlan } from "../modules/plan/create-plan";
import { getPlanById } from "../modules/plan/get-plan-by-id";
import { createPlanDto, CreatePlanDto } from "../modules/plan/dto/create-plan.dto";
import z, { ZodError } from "zod";
import { Program } from "./program.route";
import { loginMiddleware } from "../utility/login.middleware";


export interface Plan {
    id: number,
    title: string,
    description : string,
    deadLine: Date,
    programs: Program[]
}

export const plans: Plan[] = []

export const app = Router()

app.post("/", loginMiddleware, (req, res) => {
    
    try {
        const dto = createPlanDto.parse(req.body);
        handleExpress(res, () => createPlan(dto, req.user))
    } catch (e) {
        if(e instanceof ZodError) {
            res.status(400).send({message: e.issues })
        }
    }
     
})

app.get("/:id", (req, res)=> {
    
    try {
        const id = z.coerce.number().parse(req.params.id);
        handleExpress(res, () => getPlanById(id))
    } catch (e) {
        if(e instanceof ZodError) {
            res.status(400).send({message: e.issues })
        }
    }
    
    
})


