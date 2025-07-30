import { Router, Response } from "express";
import { v4 } from "uuid";
import { isNonEmptyString } from "../utility/non-empty-string";
import { HttpError } from "../utility/http-error";
import { handleExpress } from "../utility/handle-express";
import { login } from "../modules/user/login"
import { loginDto } from "../modules/user/dto/login.dto";
import { ZodError } from "zod";

type UserRole = "Admin" | "Representative" | "Normal"

export interface User {
    id: string,
    username: string,
    password: string,
    role: UserRole, 
}

export const users: User[] =[
    {id: v4() , username: "admin", password: "admin", role: "Admin"},
    {id: v4() , username: "rep", password: "rep", role: "Representative"}
]

export const app = Router()

app.post("/login", (req, res) => {
    try {
        const dto = loginDto.parse(req.body);
        handleExpress(res, () => login(dto))
    } catch (e) {
        if(e instanceof ZodError) {
            res.status(400).send({message: e.issues})
        }
    }
   
})
