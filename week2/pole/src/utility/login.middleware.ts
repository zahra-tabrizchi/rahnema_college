import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utility/http-error";
import { UserService } from "../modules/user/user.service";
import { zodUserId } from "../modules/user/model/user-id";

export const loginMiddleware =
  (userService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["authorization"];

    if (!userId || typeof userId !== "string") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const loggedInUser = await userService.findById(zodUserId.parse(userId));

    if (!loggedInUser) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    req.user = loggedInUser;

    next();
  };
