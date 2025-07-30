import { app } from "./api"
import { User } from "./routes/user.route"

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
const PORT = 3000
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT)
})