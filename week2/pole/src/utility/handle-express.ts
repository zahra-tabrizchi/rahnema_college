import { HttpError } from "./http-error"
import { Router, Response } from "express";

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