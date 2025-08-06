import { NextFunction, Request, Response } from "express"
import { userService } from "../dependency";
import { HttpError } from "../utility/http-error";

export const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["authorization"]
    
    if (!userId || typeof userId !== "string") {
        return res.status(401).send({ message: "unauthorized" });
    }

    try {
        const user = userService.getUserById(userId);
        req.user = user; // if you've extended Request type
        next();
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.status).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}