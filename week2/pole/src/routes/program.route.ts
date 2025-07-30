import { Router } from "express";
import { users } from "./user.route";
import { plans } from "../routes/plan.route"
import { isNonEmptyString } from "../utility/non-empty-string";
import { createProgramDto } from "../modules/program/dto/create-program.dto";
import { dot } from "node:test/reporters";
import { handleExpress } from "../utility/handle-express";
import { createProgram } from "../modules/program/create-program";
import { ZodError } from "zod";
import { loginMiddleware } from "../utility/login.middleware";


export interface Program {
    id: number,
    planId: number,
    title: string,
    description: string,
    userId: string
}

export const programs: Program[] = []

export const app = Router();

app.post("/",loginMiddleware, (req, res) => {
    
    try {
        const dto = createProgramDto.parse(req.body);
        handleExpress(res, () => createProgram(dto, req.user))
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).send({message: e.issues})
        }
    }

})