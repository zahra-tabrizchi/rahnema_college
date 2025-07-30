import express from "express"
import { app as planRoutes } from "./routes/plan.route"
import { app as userRoutes } from "./routes/user.route"
import { app as programRoutes } from "./routes/program.route"

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
app.use("/program", programRoutes)

app.use((req, res) => {
    res.status(404).send({ message : "Not Found"})
})
