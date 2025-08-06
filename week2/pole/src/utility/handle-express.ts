import { ZodAny, ZodError, ZodTypeAny } from "zod";
import { planService } from "../dependency";
import { HttpError } from "./http-error"
import { Router, Response } from "express";
import { createProgramDto } from "../modules/plan/program/dto/create-program.dto";

export const handleExpress = <A>(res: Response, fn: () => A) => {
    try {
        const data = fn()
        res.status(200).send(data)
    } catch (e) {
        if (e instanceof HttpError) {
            res.status(e.status).send({message: e.message})
            return;
        }
        res.status(500).send()
    }
}