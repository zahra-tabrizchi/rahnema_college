import express from "express";
import { json } from "zod";
import { app as groupRoutes} from "./routes/group.route"
import { app as expenseRoutes} from "./routes/expense.route"


export const app = express()

app.use(express.json())

if (process.env.NODE_ENV !== "TEST") {
    app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})
}

app.use("/group", groupRoutes);
app.use("/expense", expenseRoutes)

app.use((req, res) => {
    res.status(404).send({message: "Not Found"})
})