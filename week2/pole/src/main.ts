import { seedUser } from "../seed";
import { AppDataSource } from "./data-source";
import { User } from "./modules/user/model/user";
import { makeApp } from "./api";


declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
const PORT = 3000

AppDataSource.initialize()
.then((dataSource) => {
    const app = makeApp(dataSource)
    app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT)
    })
})
