import express, { ErrorRequestHandler } from "express"
import { ZodError } from "zod"
import { makePlanRouter } from "./routes/plan.route"
import { PlanService } from "./modules/plan/plan.service"
import { DataSource } from "typeorm"
import { PlanRepository } from "./modules/plan/plan.repository"
import { UserRepository } from "./modules/user/user.repository"
import { UserService } from "./modules/user/user.service"
import { makeUserRouter } from "./routes/user.route"

export const makeApp = (dataSource: DataSource) => {
const app = express()

app.use(express.json())

if (process.env.NODE_ENV !== "TEST") {
    app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})
}

const planRepo = new PlanRepository(dataSource)
const planService = new PlanService(planRepo)

const userRepo = new UserRepository(dataSource)
const userService = new UserService(userRepo)

app.use("/plan", makePlanRouter(planService, userService));
app.use(makeUserRouter(userService));


app.use((req, res) => {
    res.status(404).send({ message : "Not Found"})
})

const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
        res.status(400).send({ message: error.message})
    }
    res.status(500).send()
}

app.use(errorHandling)
return app
}