import { User } from "./model/user";
import { v4 } from "uuid";

type UserRole = "Admin" | "Representative" | "Normal"

export interface CreateUser {
    username: string,
    password: string,
    role: UserRole,
}

export class UserRepository {
    private users: User[] = [
        {id: v4() , username: "admin", password: "admin", role: "Admin"},
        {id: v4() , username: "rep", password: "rep", role: "Representative"}
    ]
   
    public userLogin(username: string, password: string) {
        return this.users.find((x) => x.username === username && x.password=== password)
    }

    public findById(userId: string) {
        return this.users.find((user) => user.id ===userId)
    }
}