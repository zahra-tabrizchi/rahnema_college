import express, { ErrorRequestHandler } from "express"
import { app as planRoutes } from "./routes/plan.route"
import { app as userRoutes } from "./routes/user.route"
import { ZodError } from "zod"

export const app = express()

app.use(express.json())

if (process.env.NODE_ENV !== "TEST") {
    app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})
}

app.use("/plan", planRoutes);
app.use(userRoutes);


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