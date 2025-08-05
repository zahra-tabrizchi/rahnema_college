import { Response } from "express"
import { HttpError } from "./http-errors"

export const handleExpress = <A>(res: Response, fn: ()=> A) => {
    try {
        const data = fn()
        res.status(200).send(data)
    }   catch (e) {
        if (e instanceof HttpError) {
            res.status(e.status).send({message: e.message})
            return;
        }
        res.status(500).send()
    }
}