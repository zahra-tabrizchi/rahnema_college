import { Router, Response } from "express";
import { isNonEmptyString } from "../utility/non-empty-string";
import { HttpError } from "../utility/http-error";
import { handleExpress } from "../utility/handle-express";
import { loginDto } from "../modules/user/dto/login.dto";
import { ZodError } from "zod";
import { userService } from "../dependency";

export const app = Router()

app.post("/login", (req, res) => {
    const dto = loginDto.parse(req.body);
    handleExpress(res, () => userService.loginUserBy(dto))
})
