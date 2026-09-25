import { Router, Response } from "express";
import { isNonEmptyString } from "../data/non-empty-string";
import { HttpError } from "../utility/http-error";
import { handleExpress } from "../utility/handle-express";
import { loginDto } from "../modules/user/dto/login.dto";
import { ZodError } from "zod";
import { UserService } from "../modules/user/user.service";

export const makeUserRouter = (userService: UserService) => {
  const app = Router();
  app.post("/login", (req, res) => {
    const dto = loginDto.parse(req.body);
    handleExpress(res, () => userService.login(dto));
  });

  return app;
};
